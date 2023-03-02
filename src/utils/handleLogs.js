
export const handleLogs = (attribute, attributesLogs, setAttributesLogs, value, attributes) => {

  if (attribute === 'disableZoom')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed Zoom to ${value}` })

  if (attribute === 'autoRotate')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed auto rotate to ${value}` })

  if (attribute === 'autoRotateDelay')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed auto rotate delay to ${value}` })

  if (attribute === 'backgroundColor')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed background color to ${value}` })

  if (attribute === 'cameraOrbit' && value.useDefault === true)
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed camera orbit to default` })

  if (attribute === 'cameraOrbit' && value.useDefault === false)
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed camera orbit to custom` })

  if (attribute === 'cameraOrbit' && value.changeCustom === 'cameraOrbit') {
    const { custom } = attributes.cameraOrbit
    return setAttributesLogs({
      ...attributesLogs,
      'cameraOrbit': `changed camera orbit to custom { Side to Side : ${custom.side}, Up and Down : ${custom.ud}, In and Out : ${custom.io}  }`
    })
  }

  if (attribute === 'maxCameraOrbit' && value.useDefault === true)
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed camera orbit to default` })

  if (attribute === 'maxCameraOrbit' && value.useDefault === false)
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed camera orbit to custom` })

  if (attribute === 'maxCameraOrbit' && value.changeCustom === 'maxCameraOrbit') {
    const { custom } = attributes.maxCameraOrbit
    return setAttributesLogs({
      ...attributesLogs,
      'maxCameraOrbit': `changed camera orbit to custom { Side to Side : ${custom.side}, Up and Down : ${custom.ud}, In and Out : ${custom.io}  }`
    })
  }

  if (attribute === 'minCameraOrbit' && value.useDefault === true)
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed camera orbit to default` })

  if (attribute === 'minCameraOrbit' && value.useDefault === false)
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed camera orbit to custom` })

  if (attribute === 'minCameraOrbit' && value.changeCustom === 'minCameraOrbit') {
    const { custom } = attributes.minCameraOrbit
    return setAttributesLogs({
      ...attributesLogs,
      'minCameraOrbit': `changed camera orbit to custom { Side to Side : ${custom.side}, Up and Down : ${custom.ud}, In and Out : ${custom.io}  }`
    })
  }

  if (attribute === 'fieldOfView')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed field of view to ${value}` })

  if (attribute === 'shadowIntensity')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed shadow intensity to ${value}` })

  if (attribute === 'shadowSoftness')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed shadow softness to ${value}` })

  if (attribute === 'skyboxImage')
    return setAttributesLogs({
      ...attributesLogs, [attribute]: `changed skybox image to {'status': ${value.active ? 'active' :
        'inactive'}${value.image ? `, image: ${value.image}` : ''}}`
    })

  if (attribute === 'environmentImage')
    return setAttributesLogs({
      ...attributesLogs, [attribute]: `changed environment image image to {'status': ${value.active ? 'active' :
        'inactive'}${value.image ? `, image: ${value.image}` : ''}}`
    })

  if (attribute === 'alt')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed SEO text to "${value}"` })

  if (attribute === 'scale')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed AR Scale to "${value}"` })

  if (attribute === 'placement')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed AR Placement to "${value}"` })

  if (attribute === 'Button Image')
    return setAttributesLogs({ ...attributesLogs, [attribute]: `changed AR Button Image to "${value}"` })

  return setAttributesLogs({ ...attributesLogs, [attribute]: `changed ${attribute} to ${value}` })
}
