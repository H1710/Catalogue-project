export const ValidateService = (user) => {
  if (!user) {
    return "Free";
  }
  const length = user.orders.length;
  if (length !== 0) {
    const dateBuyService = new Date(user.orders[length - 1].createdAt);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - dateBuyService.getTime();
    const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const remainingDayofService =
      user.orders[length - 1].service_package.remain_day;

    if (remainingDayofService >= daysDifference) {
      return "Premium";
    }
  }
  return "Free";
};
