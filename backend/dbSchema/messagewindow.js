'use strict'

let mongoose = require('mongoose');

const MessageWindowSchema = new mongoose.Schema(
  {
    initiator:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'initiatorType'
    },
    initiatorType:{
      type: String,
      required: true,
      enum: ['StudentProfile', 'CompanyProfile']
    },
    receiver:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'receiverType'
    },
    receiverType:{
      type: String,
      required: true,
      enum: ['StudentProfile', 'CompanyProfile']
    },
    messages: [{
      message: {
        type: String,
        required: true
      },
      creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      createdAt:{
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true
  }
);

MessageWindowSchema.statics.createNewRecord = async function(data){
  let messageWindow = new this();
  messageWindow.initiator = data.senderId;
  messageWindow.initiatorType = data.senderType;
  messageWindow.receiver = data.receiverId;
  messageWindow.receiverType = data.receiverType;
  messageWindow.messages.push({
    message: data.message,
    creatorId: data.senderId
  });
  await messageWindow.save();
  return await this.findById(messageWindow._id)
  .populate('initiator')
  .populate('receiver')
  .then(async messageWindow =>{
    messageWindow.initiator.messageWindows.push(messageWindow._id);
    messageWindow.receiver.messageWindows.push(messageWindow._id);
    await messageWindow.initiator.save();
    await messageWindow.receiver.save();
    return messageWindow;
  });
}


module.exports = mongoose.model.MessageWindow || mongoose.model('MessageWindow', MessageWindowSchema);