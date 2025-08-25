# Bakin-Credits-Sequence-Builder
Generate a credit sequence event for RPG Developer Bakin using this easy website! Also supports adding images during the scroll.

## Guide
### Adding Objects
<img width="391" height="85" alt="image" src="https://github.com/user-attachments/assets/9dbdc8ee-431e-4b11-af14-093f1110e776" />

Click on one of the circles to add a new object for the credits.
- Header: Large text header, good for headers and company names, like Meringue Entertainment.
- Title: Medium text header, good for job titles like QA Testers or Battle Programmers.
- Cast: Small text paragraph, meant for writing the name of people.
  - This supports multiple paragraphs. For each line skip, the name will be placed under it.
- Image: An image of your choice, for logos or scrolling images for visual purposes.
  - GUID: The image GUID, located in the grey box, which can be copied from the Resources folder in Bakin by right-clicking and copying GUID. Replace the default value of zeros to the one copied so that when importing the event, the image is already assigned properly.
  - Scale: Default 25, the scale of the image. Scaling is uniform for general purposes, but if you must, you can manually modify it in the event itself after export.
  - XY: Positioning at the start of the scroll, at the bottom of the screen ideally. It should be placed out of sight so that it can appear without suddenly appearing.
  - End Y: The Y position that the image should end at after it scrolls. Because image sizes can vary, it's important to test this by exporting and trying out the value.
  - Speed: The scroll speed, in seconds. It is extremely hard to get an accurate scroll speed that perfectly matches the scroll speed of the text due to limitations, so this also needs to be heavily tested with exporting.
- Wait: A manual wait time event, in seconds.
- Final: A medium-sized line of text in white, that stops at the middle of the screen, stays for a bit, and then fades away.

### Presets
<img width="298" height="193" alt="image" src="https://github.com/user-attachments/assets/80f38266-93b0-4300-9a92-8f061d293fd8" />

Input a name for your preset and press save to save it in local memory.
You can then select it and press load to load it back into the editor.
If needed, you can delete a selected preset with the delete button.

### Export Button
Pressing the export button will generate a bakin event txt file.
To load it in Bakin, simply open any event, and press on the import button on the top-right.

### Properties
<img width="295" height="587" alt="image" src="https://github.com/user-attachments/assets/bc350b8d-472a-40c3-b47e-e6f631aa17ea" />

- Starting Positions: The XY starting coordinates of both words and image objects by default. This should be a value that's offscreen in order to avoid having objects appearing spontaneously, and should be placed towards the bottom ideally.
- End Positions (Y): The Y position of various object types. For images and normal objects, the default is meant to be off-screen at the top, but for the final line, it's placed around the middle.
- Speeds: Scroll speeds of each object type, in seconds. How long does it take for the object to go from the starting position's Y to the final position's Y coordinate.
- Starting Line ID: the image ID slot used in Bakin. Adding images on screen through events use ID slots, and this event generator increments the ID value of each subsequent object spawned by 1, before deleting all of them at once after the credits are complete. Default value is 32, but if you have images loaded in slots there for various reasons, you can change the starting ID to place it in a range where you're sure to not have it affect other parts of your game (like 600, or 900).
