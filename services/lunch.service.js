const httpStatus = require('http-status');
const { dB } = require('../models');
const ApiError = require('../utils/ApiError');

const giftLunch = async (body) => {
    try {
      const { sender_id, receiver_id, quantity, note, org_id } = body;
      // Create a new lunch record in the 'lunches' table
      const lunch = await dB.lunches.create({
        sender_id,
        receiver_id,
        quantity,
        note,
        org_id,
      });
  
      if (!lunch) {
        throw new Error('Failed to gift lunch');
      }
  
      return { message: 'Lunch gifted successfully', lunch };
    } catch (error) {
      throw new Error(`Failed to gift lunch: ${error.message}`);
    }
  };
  
  const redeemLunch = async (lunchId) => {
    try {
      // Find the lunch record by its ID
      const lunch = await dB.lunches.findByPk(lunchId);
  
      if (!lunch) {
        throw new Error('Lunch record not found');
      }
  
      // Update the lunch record to mark it as redeemed
      lunch.redeemed = true;
      await lunch.save();
  
      return { message: 'Lunch redeemed successfully', lunch };
    } catch (error) {
      throw new Error(`Failed to redeem lunch: ${error.message}`);
    }
  };
  
  module.exports = { giftLunch, redeemLunch };
  