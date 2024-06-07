import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ZegoUIKitPrebuiltCallService, {
//   ZegoCallInvitationDialog,
//   ZegoUIKitPrebuiltCallWaitingScreen,
//   ZegoUIKitPrebuiltCallInCallScreen,
//   ZegoSendCallInvitationButton,
// } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {UserContext} from '../../user/userContext';
import {GetMessageSR} from '../../user/userService';
import {styles} from '../style/chat';

const ChatScreenIn = ({route, navigation}) => {
  const {receiver} = route.params;
  const {user} = useContext(UserContext);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const socket = useRef(null);

  // console.log('>>>>>>>>>>>. iteiitemmm ', receiver._id);

  useEffect(() => {
    // Khởi tạo socket khi component được mount
    socket.current = io('http://192.168.0.102:3000/');
    // 11.189.180.53

    let isConnected = false;

    const handleConnect = () => {
      isConnected = true;
      console.log('Socket đã kết nối');
    };

    const handleDisconnect = () => {
      isConnected = false;
      console.log('Socket đã ngắt kết nối');
    };

    socket.current.on('connect', handleConnect);
    socket.current.on('disconnect', handleDisconnect);

    // Lắng nghe sự kiện new_message từ socket
    socket.current.on('new_message', newMessage => {
      // Kiểm tra xem tin nhắn mới có thuộc về hai người liên quan hay không
      if (
        (newMessage.idSender === user.user._id &&
          newMessage.idReceiver === receiver._id) ||
        (newMessage.idSender === receiver._id &&
          newMessage.idReceiver === user.user._id)
      ) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    });

    fetchData();

    return () => {
      // Clear up khi component unmount
      socket.current.off('connect', handleConnect);
      socket.current.off('disconnect', handleDisconnect);
      socket.current.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const idSender = user.user._id;
      const idReceiver = receiver._id;
      const response = await GetMessageSR(idSender, idReceiver);
      setMessages(response);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const sendMessage = content => {
    if (content === '' || !content.trim()) {
      return;
    }
    if (socket.current && socket.current.connected) {
      const newMessage = {
        idSender: user.user._id,
        idReceiver: receiver._id,
        content: content,
        time: new Date().toISOString(),
      };
      socket.current.emit('new_message', newMessage);
      setMessageInput('');
    } else {
      console.error('Socket chưa kết nối');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.chat}>
        {item.idSender === user.user._id ? (
          <View style={styles.sentMessage}>
            <Text style={styles.sentContent}>{item.content}</Text>
          </View>
        ) : (
          <View style={styles.receivedMessage}>
            <View style={styles.contentreceiver}>
              <Text style={styles.receivedText}>{item.content}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.T}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.back_user}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={26} color={'#000'} />
          </TouchableOpacity>
          {/* {console.log('>>>>>>> kakakaka', receiver.receiverv2)} */}
          {receiver._id === user.user._id ? (
            <TouchableOpacity style={styles.account}>
              <Image
                source={require('../../assets/image.png')}
                style={styles.avatar}
              />
              <Text style={styles.name_user}>{receiver.name}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.account}
                onPress={() =>
                  navigation.navigate('OtherUserA2', {
                    accountzzz: receiver,
                  })
                }>
                <Image
                  source={require('../../assets/image.png')}
                  style={styles.avatar}
                />
                <Text style={styles.name_user}>{receiver.name}</Text>
              </TouchableOpacity>
              {/* {console.log('>>>>>>>>>>>. iteiitemmm ', receiver)} */}
            </>
          )}
        </View>
        {/* <View style={styles.call_video}>
          <ZegoSendCallInvitationButton
            invitees={[{userID: receiver.receiverv2, userName: receiver.name}]}
            isVideoCall={false}
            resourceID={'sweets_call'}
          />
          <ZegoSendCallInvitationButton
            invitees={[{userID: receiver.receiverv2, userName: receiver.name}]}
            isVideoCall={true}
            resourceID={'sweets_call'}
          />
        </View> */}
        <View style={styles.call_video}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CallScreen', {
                receiver: receiver,
                isVideoCall: false,
              })
            }>
            <FontAwesome6 name="phone" size={20} color={'#0000ff'} right={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CallScreen', {
                receiver: receiver,
                isVideoCall: true,
              })
            }>
            <FontAwesome6 name="video" size={20} color={'#0000ff'} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.line} />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
      <FlatList
        inverted={true}
        data={messages.slice().reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem({item})}
      />
      <View style={styles.input}>
        <TextInput
          style={styles.input_text}
          placeholder="Bạn muốn nói gì?"
          placeholderTextColor="#000"
          value={messageInput}
          onChangeText={text => setMessageInput(text)}
          onSubmitEditing={
            messageInput ? () => sendMessage(messageInput) : () => {}
          }
        />
        <TouchableOpacity
          style={styles.send}
          onPress={() => sendMessage(messageInput)}>
          <Image
            style={styles.back}
            source={require('../../assets/email_send_50px.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreenIn;
