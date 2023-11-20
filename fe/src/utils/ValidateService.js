export const ValidateService = (user) => {
  if (!user) {
    return "Free";
  }
  let remainingDays = 0;
  const length = user.orders.length;
  console.log(user);
  
  if (length === 0) return "Free";
  if (length !== 0) {
    if (user?.orders[length - 1]?.service_package?.name === "Monthly Premium"){
      remainingDays = 30;
    }else if (user?.orders[length - 1]?.service_package?.name === "Yearly Premium"){
      remainingDays = 365;
    }

    const dateBuyService = new Date(user?.orders[length - 1]?.createdAt);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - dateBuyService.getTime();
    const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const remainingDayofService = remainingDays;
    if (remainingDayofService >= daysDifference) {
      return user?.orders[length - 1]?.service_package?.name;
    }
  }
  return "Free";
};
