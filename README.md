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
