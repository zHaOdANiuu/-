Set ws = CreateObject("WScript.Shell")
WScript.Sleep 1000
For i=0 To 30
  ws.SendKeys "^c^v{ENTER}"
Next