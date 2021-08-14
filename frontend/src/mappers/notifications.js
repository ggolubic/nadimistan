export const fromLoadNotifications = data => {
  return data.map(notification => ({
    id: notification.id,
    userId: notification.user_id,
    subId: notification.subscription_id,
    listingIds: notification.listing_ids,
    createdAt: notification.created_at,
    isRead: notification.is_read,
    readAt: notification.read_at,
  }));
};
