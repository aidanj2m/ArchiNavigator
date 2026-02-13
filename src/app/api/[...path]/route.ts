import { NextResponse } from "next/server";
import { createCallBooking } from "../endpoints/calls";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../endpoints/items";
import { sendEmail, testEmail } from "../endpoints/resendEmail";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const route = path.join("/");

  // GET /api/items
  if (route === "items") {
    return getItems();
  }

  // GET /api/items/:id
  if (path[0] === "items" && path.length === 2) {
    const id = parseInt(path[1], 10);
    if (isNaN(id)) {
      return NextResponse.json({ detail: "Invalid item ID" }, { status: 400 });
    }
    return getItem(id);
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const route = path.join("/");

  // POST /api/calls
  if (route === "calls") {
    return createCallBooking(request);
  }

  // POST /api/items
  if (route === "items") {
    return createItem(request);
  }

  // POST /api/email/send
  if (route === "email/send") {
    return sendEmail(request);
  }

  // POST /api/email/test
  if (route === "email/test") {
    return testEmail();
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  // PUT /api/items/:id
  if (path[0] === "items" && path.length === 2) {
    const id = parseInt(path[1], 10);
    if (isNaN(id)) {
      return NextResponse.json({ detail: "Invalid item ID" }, { status: 400 });
    }
    return updateItem(id, request);
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  // DELETE /api/items/:id
  if (path[0] === "items" && path.length === 2) {
    const id = parseInt(path[1], 10);
    if (isNaN(id)) {
      return NextResponse.json({ detail: "Invalid item ID" }, { status: 400 });
    }
    return deleteItem(id);
  }

  return NextResponse.json({ detail: "Not found" }, { status: 404 });
}
