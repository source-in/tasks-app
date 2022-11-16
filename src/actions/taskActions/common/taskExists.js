//@ts-check

/**
 * @params title {string}
 * @params models {sequelize models}
 * @returns Promise<user> | Promise<false> if user exists it returns user details else false
 */

 module.exports.taskExists = async (searchKey, models) => {
    if (Object.keys(searchKey).length > 0) {
      console.log(searchKey)
      const task = await models.Tasks.findOne({
        where: searchKey
      });
      return task ? task : false;
    }
  };
  