const {
  createTicket,
  updateTicket,
  getAllTickets,
  getTicketById,
} = require("../controllers/ticket.controller");
const { verifyJwtToken } = require("../middlewares/verifyJwt");

module.exports = function (app) {
  app.post("/crm/api/v1/tickets", [verifyJwtToken], createTicket);

  app.put("/crm/api/v1/tickets/:id", [verifyJwtToken], updateTicket);

  app.get("/crm/api/v1/tickets", [verifyJwtToken], getAllTickets);

  app.get("/crm/api/v1/tickets/:id", [verifyJwtToken], getTicketById);
};
