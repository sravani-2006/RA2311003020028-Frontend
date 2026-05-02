# Notification System Design

## Stage 1

### Problem

We need to fetch notifications from an API and identify the top 10 most important unread notifications.

Unread is assumed as all notifications.

---

### Priority Strategy

Each notification is assigned a priority weight:

- Placement = 3
- Result = 2
- Event = 1

Sorting rules:

1. Higher priority first
2. If same priority → newer timestamp first

---

### Top 10 Computation

Steps:

1. Fetch all notifications
2. Assign priority using mapping
3. Sort:
   - Primary → priority (desc)
   - Secondary → timestamp (desc)
4. Take first 10 elements

---

### Time Complexity

- Sorting: O(n log n)
- Slicing top 10: O(1)

Total: O(n log n)

---

### Optimized Streaming Approach (Important for Interviews)

Instead of sorting all notifications:

Use a **Min Heap of size 10**

Algorithm:

1. Iterate notifications
2. Push into heap (based on priority + timestamp)
3. If heap size > 10 → remove smallest
4. Final heap = top 10

Time Complexity:

- O(n log k), where k = 10
  → effectively O(n)

---

### Why Min Heap?

Efficient for:

- Real-time systems
- Continuous data streams
- Memory-constrained environments

---

### Scalability

For large-scale systems:

- Use streaming processors (Kafka consumers)
- Maintain distributed priority queues
- Cache top results (Redis)

---
