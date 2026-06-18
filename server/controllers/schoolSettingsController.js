const SchoolSettings =
  require(
    "../models/SchoolSettings"
  );

const createSchoolSettings =
  async (req, res) => {
    try {

      const existing =
        await SchoolSettings.findOne();

      if (existing) {
        return res.status(400).json({
          success: false,
          message:
            "School settings already exist",
        });
      }

      const settings =
        await SchoolSettings.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: settings,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const getSchoolSettings =
  async (req, res) => {
    try {

      const settings =
        await SchoolSettings.findOne();

      res.status(200).json({
        success: true,
        data: settings,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const updateSchoolSettings =
  async (req, res) => {
    try {

      const settings =
        await SchoolSettings.findOne();

      if (!settings) {
        return res.status(404).json({
          success: false,
          message:
            "School settings not found",
        });
      }

      Object.assign(
        settings,
        req.body
      );

      await settings.save();

      res.status(200).json({
        success: true,
        data: settings,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  createSchoolSettings,
  getSchoolSettings,
  updateSchoolSettings,
};