import { NextResponse } from "next/server";

interface Item {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// Simple in-memory storage (will reset on each deployment)
const mockItems: Item[] = [
  {
    id: 1,
    title: "Sample Architecture Diagram",
    description: "A sample diagram showing system architecture",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "API Documentation",
    description: "REST API documentation for the project",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let nextId = 3;

export async function getItems() {
  console.log("[Items] Fetching all items");
  return NextResponse.json(mockItems);
}

export async function getItem(itemId: number) {
  console.log(`[Items] Fetching item with ID: ${itemId}`);
  const item = mockItems.find((i) => i.id === itemId);
  if (!item) {
    return NextResponse.json({ detail: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function createItem(request: Request) {
  const body = await request.json();
  const { title, description } = body;

  if (!title) {
    return NextResponse.json(
      { detail: "Title is required" },
      { status: 400 }
    );
  }

  console.log(`[Items] Creating new item: ${title}`);

  const newItem: Item = {
    id: nextId++,
    title,
    description: description ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockItems.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}

export async function updateItem(itemId: number, request: Request) {
  console.log(`[Items] Updating item with ID: ${itemId}`);
  const item = mockItems.find((i) => i.id === itemId);
  if (!item) {
    return NextResponse.json({ detail: "Item not found" }, { status: 404 });
  }

  const body = await request.json();
  if (body.title !== undefined) item.title = body.title;
  if (body.description !== undefined) item.description = body.description;
  item.updated_at = new Date().toISOString();

  return NextResponse.json(item);
}

export async function deleteItem(itemId: number) {
  console.log(`[Items] Deleting item with ID: ${itemId}`);
  const index = mockItems.findIndex((i) => i.id === itemId);
  if (index === -1) {
    return NextResponse.json({ detail: "Item not found" }, { status: 404 });
  }

  mockItems.splice(index, 1);
  return NextResponse.json({ message: "Item deleted successfully" });
}
