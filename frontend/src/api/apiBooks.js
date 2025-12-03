export async function getBooks() {
  const res = await fetch("/api/books/allbooks");
  if (!res.ok) {
    throw new Error("Searching books failed");
  }
  const books = await res.json();
  return books;
}

export async function getTopBooks() {
  const res = await fetch("/api/books/topbooks");
  if (!res.ok) {
    throw new Error("Searching top books failed");
  }

  const topbooks = await res.json();
  return topbooks;
}
