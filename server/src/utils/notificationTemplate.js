const template = (data) => {
  return {
    createBookingNotificationForPartner: {
      subject: 'Incoming New Order',
      content: `User ${data.name} has made a booking on date ${data.date}. Please confirmation this booking soon.`
    },
    createBookingNotificationForClient: {
      subject: 'Approve Order',
      content: `Our partner ${data.name} has approve booking on date ${data.date}. You will be contact soon.`
    },
    createReviewNotificationForPartner: {
      subject: 'New review order',
      content: 'You got new review on your history order. You can check the review on page reviews.'
    },
    createReviewNotificationForClient: {
      subject: 'Give us ratings',
      content: 'Please give us your honest review on your last order'
    },
  };
};

module.exports = template;