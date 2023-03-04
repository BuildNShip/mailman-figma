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

  nodes.push(newpost);

  figma.viewport.scrollAndZoomIntoView(nodes);

  pluginMessage['image'] = newpost





  // figma.closePlugin()
}
