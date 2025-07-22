# PowerShell

## Getting Started

Tabbing through nouns, params, methods, and properties is a great cheat.

Otherwise:

```bash
# No, I want information about the *collection*, not the elements of it
Get-Member -InputObject $Object

# OK, no, I know this exists where did it go?
$Object | Get-Member -Static

# What even is this thing?
$Object.GetType().FullName

# Ah, Christ, I need metedata
$Object.PSObject
```
