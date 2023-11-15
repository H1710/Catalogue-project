module.exports = (sequelize, DataTypes) => {
  const ImageUpload = sequelize.define(
    "image_upload",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timeStamp: true,
    }
  );

  return ImageUpload;
};
