figma.showUI(__html__)
figma.ui.resize(500, 500)

figma.ui.onmessage = async (pluginMessage) => {
  
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" });
  const nodes:SceneNode [] = [];
  // console.log(pluginMessage)
  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
  // const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
  // const defaultDark = postComponentSet.findOne(node => node.type == "COMPONENT_SET" && node.name == "Image=none, Dark mode") as ComponentNode;

  let selectedVariant;

  if (pluginMessage.darkModeState === true) {
    switch (pluginMessage.imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
        break;
      default:
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
        break;
    }
  } else {
    switch (pluginMessage.imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
        break;
      default:
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
  }

  const newpost = selectedVariant.createInstance()
  const templateName = newpost.findOne(node => node.type == "TEXT" && node.name == "displayName") as TextNode;
  const templateUsername = newpost.findOne(node => node.type == "TEXT" && node.name == "@username") as TextNode;
  const templateDescription = newpost.findOne(node => node.type == "TEXT" && node.name == "description") as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;
  
  
  // nodes.push(newpost);

  // figma.viewport.scrollAndZoomIntoView(nodes);


  // pluginMessage['file'] = newpost


  // const polygon = figma.createPolygon()
  // polygon.pointCount = 6
  // polygon.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]

  // Export a 2x resolution PNG of the node
  const bytes = await newpost.exportAsync({
    format: 'PNG',
    constraint: { type: 'SCALE', value: 2 },
  })

  // Add the image onto the canvas as an image fill in a frame
  const image = figma.createImage(bytes)
  const frame = figma.createFrame()
  frame.x = 200
  frame.resize(200, 230)
  frame.fills = [{
    imageHash: image.hash,
    scaleMode: "FILL",
    scalingFactor: 1,
    type: "IMAGE",
  }]


  for (const paint of frame.fills) {
    if (paint.type === 'IMAGE') {
      const image = figma.getImageByHash(paint.imageHash!);
      // const bytes = await image.getBytesAsync()
    }
  }
    
  // pluginMessage['inputFile'] = 'name.csv'
  // pluginMessage['mailAttachment'] = image

  // Set up the export settings
  // const exportSettings = [
  //   {
  //     format: 'PNG',
  //     constraint: {
  //       type: 'SCALE',
  //       value: 2,
  //     },
  //   },
  // ];

  // Get the selected layer
  // const selectedLayer = figma.currentPage.selection[0];

  // Export the layer as an image
  // selectedLayer.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } })
  //   .then((imageData) => {
  //     // Create a new file
  //     const file = new Uint8Array(imageData);

  //     // Save the file to the user's computer
  //     const fileName = `${selectedLayer.name}.png`;
  //     console.log(fileName)

      // const blob = new Blob([file], { type: 'image/png' });

      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = fileName;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
    // });


  // await fetch('https://agarjun007.pythonanywhere.com/api/send-mail', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(pluginMessage)
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error))


  







  // figma.closePlugin()
}

