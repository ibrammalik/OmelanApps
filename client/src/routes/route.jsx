const ROUTES = {
  caretaker: {
    dashboard: "/dashboard/caretaker",
    appointment: "/dashboard/caretaker/appointment",
    review: "/dashboard/caretaker/review",
    order: "/dashboard/caretaker/order",
    caregiverDetail: "/dashboard/caretaker/caregiver/:id",
    profile: "/dashboard/caretaker/profile",
    favorite: "/dashboard/caretaker/favorite",
  },

  caregiver: {
    dashboard: "/dashboard/caregiver",
    appointment: "/dashboard/caregiver/appointment",
    confirmOrder: "/dashboard/caregiver/order/:orderId/confirm",
    availability: "/dashboard/caregiver/availability",
    reviews: "/dashboard/caregiver/reviews",
    earnings: "/dashboard/caregiver/earnings",
    profile: "/dashboard/caregiver/profile",
  },
};

export default ROUTES;
