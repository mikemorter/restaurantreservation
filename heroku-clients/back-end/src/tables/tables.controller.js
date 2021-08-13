const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.services");
const reservationsService = require("../reservations/reservations.service");

// Middleware
validFields = ["table_name", "capacity"];

// check if body has data

function bodyHasData(req, res, next) {
  const data = req.body.data;
  if (data) return next();
  else
    return next({
      status: 400,
      message: "All fields need valid input",
    });
}

// check if bdy has a reservation_id

function bodyHasResId(req, res, next) {
  const { reservation_id } = req.body.data;
  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_id is required",
  });
}

// check to see if table_id exists

async function tableIdExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${table_id} does not exist`,
  });
}

// check to see if reservation_id exists

async function resIdExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservations = await reservationsService.read(reservation_id);
  const reservation = reservations[0];
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else
    return next({
      status: 404,
      message: `${reservation_id} does not exist`,
    });
}

// check to see if the request has a table_name

function reqHasTableName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name && table_name.length >= 2) {
    return next();
  } else
    return next({
      status: 400,
      message: "table_name must be 2 characters or more",
    });
}

// check to see if the table has the capacity for the request

async function tableHasCapacity(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (res.locals.reservation.people > Number(table.capacity)) {
    return next({
      status: 400,
      message: "Table capacity is too small for reservation size",
    });
  }
  next();
}

// check to see if the table is occupied

async function tableIsOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table.reservation_id === null) {
    return next();
  }
  next({
    status: 400,
    message: "This table is already occupied",
  });
}

// check to see if the table is unoccupied

async function tableIsUnoccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table.reservation_id === null) {
    return next({
      status: 400,
      message: "Table is not occupied",
    });
  }
  return next();
}

// check to see if there is a capacity, it is a number and is greater than 0

function reqHasCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity && typeof capacity === "number" && Number(capacity) > 0) {
    return next();
  } else
    return next({
      status: 400,
      message: "capacity must be a number larger than 0",
    });
}

// check to see if the reservation is already seated

async function reservationIsAlreadySeated(req, res, next) {
  if (res.locals.reservation.status === "seated") {
    return next({
      status: 400,
      message: "This reservation is already seated",
    });
  } else return next();
}

// list all tables

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

// create new table

async function create(req, res, next) {
  const newTable = req.body.data;
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

// update existing table

async function update(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  const data = await service.update(reservation_id, table_id);
  res.json({ data });
}

// finish a table

async function finishTable(req, res, next) {
  const { table_id, reservation_id } = res.locals.table;
  const data = await service.finishTable(reservation_id, table_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasData,
    reqHasTableName,
    reqHasCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    bodyHasData,
    bodyHasResId,
    asyncErrorBoundary(resIdExists),
    reservationIsAlreadySeated,
    asyncErrorBoundary(tableHasCapacity),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(update),
  ],
  finishTable: [
    tableIdExists,
    tableIsUnoccupied,
    asyncErrorBoundary(finishTable),
  ],
};
