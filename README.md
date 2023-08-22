# Example VS Code bug where tests don't get added

To reproduce:

- build extension
- load extension
- run "Add Tests" (once) -- this will print "added no tests", but you will get a partial tree in the test explorer
- run "Add Tests" (again) -- this will print "added one test", **and you will not get your test node in the tree**

## Notes

This bug does not appear to happen if the first time you create the tree, you have the right number of siblings. To reproduce this, set `alwaysChildren` to true -- this will insert `TEST0`, and then every time you run "Add Tests", it will either add or remove `TEST1`.
