const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const spot_id = req.params.id;
    const { date } = req.body;

    if (!date)
      return res.status(400).json({ error: "Date not could be empty" });

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_req", booking);
    }

    return res.json(booking);
  }
};
