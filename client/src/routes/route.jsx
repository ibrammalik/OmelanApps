const ROUTES = {
  caretaker: {
    dashboard: '/dashboard/caretaker',
    appointment: '/dashboard/caretaker/appointment',
    review: '/dashboard/caretaker/review',
    order: '/dashboard/caretaker/order',
    caregiverDetail: '/dashboard/caretaker/caregiver/:id',
  },

  caregiver: {
    dashboard: '/dashboard/caregiver',
    appointment: '/dashboard/caregiver/appointment',
    requests: '/dashboard/caregiver/requests',
    availability: '/dashboard/caregiver/availability',
    reviews: '/dashboard/caregiver/reviews',
    earnings: '/dashboard/caregiver/earnings',
  },
};

export default ROUTES;
