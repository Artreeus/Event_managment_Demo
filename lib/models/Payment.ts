import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    stripePaymentIntentId: String,
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: String,
  },
  { timestamps: true }
);

export const Payment =
  mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
