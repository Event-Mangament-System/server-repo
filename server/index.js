const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const venueRouter = require("./routes/venue");
const adminRouter = require("./routes/admin");
const serviceRouter = require("./routes/services")
const bookingRouter = require("./routes/booking");
const eventcategoriesRouter = require("./routes/event_categories");
const eventsubcategoriesRouter = require("./routes/event_subcategories");
const event_serviceRouter = require("./routes/event_services");
const service_typesRouter = require("./routes/service_types");
const eventRouter = require("./routes/events")
const feedbackRouter = require("./routes/feedback")
const { jwtAuth } = require("./utils/jwtauth");

const cors = require("cors");
app.use(cors());

app.use(express.json());
//app.use(jwtAuth);
app.use("/users", userRouter);
app.use("/venues", venueRouter);
app.use("/admin",adminRouter);
app.use("/services",serviceRouter);
app.use("/booking", bookingRouter);
app.use("/event_categories", eventcategoriesRouter);
app.use("/event_subcategories", eventsubcategoriesRouter);
app.use("/event_services",event_serviceRouter);
app.use("/service_types",service_typesRouter);
app.use("/events",eventRouter);
app.use("/feedback",feedbackRouter);



const port = 5000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});
