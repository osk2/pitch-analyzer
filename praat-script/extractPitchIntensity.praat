clearinfo
form Parameters
	text directory 
	text basename 
endform

Read from file: directory$ + basename$ + ".wav"

sound$ = "Sound " + basename$
int$ = "Intensity " + basename$
pitch$ = "Pitch " + basename$

To Intensity: 100, 0, "yes"

selectObject: sound$

To Pitch: 0, 75, 600

selectObject: int$
Write to binary file: directory$ + basename$ + ".Intensity"

selectObject: pitch$
Write to binary file: directory$ + basename$ + ".Pitch"

select all
Remove

appendInfoLine: "Pitch and intensity objects have been created. File: ", basename$
