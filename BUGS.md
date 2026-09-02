# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** In `src/components/ExpenseList.jsx`, changed the sort order from `dateValue(a.date) - dateValue(b.date)` to `dateValue(b.date) - dateValue(a.date)` to reverse the sorting so newest expenses appear first.

---

## Bug 2

**How to reproduce:** Add an expense with some data. Use the "Paid by" filter dropdown to filter by a specific person. The expenses don't filter.

**What is wrong:** The "Paid by" filter doesn't work because it compares a string value from the select element to numeric member IDs in the expense data, causing the comparison to always fail.

**What I changed:** In `src/App.jsx`, changed the filter comparison from `e.paidBy !== paidBy` to `e.paidBy !== Number(paidBy)` to convert the string select value to a number before comparing.

---

## Bug 3

**How to reproduce:** Add an expense, close and reopen the app (by clearing localStorage or refreshing). The expense list order is wrong.

**What is wrong:** When expenses are loaded from localStorage, the date strings are not converted back to Date objects. This breaks date comparisons and sorting.

**What I changed:** In `src/state/store.js`, modified `loadState()` to call `hydrate()` on the parsed data from localStorage, which converts date strings back to Date objects. Also improved `dateValue()` in `src/lib/format.js` to handle both Date objects and strings.

---

## Bug 4

**How to reproduce:** Add an expense where the payer is NOT included in the split group. For example, person A pays $100 for a cab split between only persons B and C. Check the balances panel and settle-up list.

**What is wrong:** When the payer is not in the split group, they're incorrectly being charged a share of the expense. According to the spec, if someone pays for something they don't use (like a cab they didn't ride), they should get that fare back in full.

**What I changed:** In `src/lib/balances.js`, removed the incorrect logic that was subtracting the payer's share when they weren't in the split. Now the payer simply gets credited the full amount they paid, and only the people in the split group are charged their shares.

---

## Bug 5

**How to reproduce:** Check the Balances panel. A member with a positive balance (who paid more than their share and is in credit) shows as "owes $X" in red text, while a member with a negative balance (who consumed more than paid and owes money) shows as "is owed $X" in green text.

**What is wrong:** The conditions and CSS classes in `BalancesPanel.jsx` were inverted. Positive balance (`bal > 0`) represents credit and should say "is owed", whereas negative balance (`bal < 0`) represents debt and should say "owes".

**What I changed:** In `src/components/BalancesPanel.jsx`, updated the condition checks and class names so `bal > 0.005` renders `is owed ${formatMoney(bal)}` with class `owed` (green), and `bal < -0.005` renders `owes ${formatMoney(-bal)}` with class `owe` (red).

---

## Bug 6

**How to reproduce:** Create a scenario where a debtor owes the exact same amount as a creditor is owed (e.g. Member 1 owes $50 and Member 2 is owed $50). Check the Settle up panel.

**What is wrong:** In `src/lib/settle.js`, the `while` loop had an `else` branch for when `d.amount === c.amount` that only incremented indices `i += 1; j += 1;` without adding the transfer to `transfers`. As a result, exact matching debts were skipped and not resolved in the settlement suggestions.

**What I changed:** In `src/lib/settle.js`, computed `settleAmount = Math.min(d.amount, c.amount)` and pushed the transfer for all valid amounts, decrementing both debtor and creditor amounts and advancing pointers appropriately.
