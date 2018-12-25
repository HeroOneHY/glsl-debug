

function initialize(scene)
  
   local shaderNode1 = KuruShaderFilterNode.createWithFragmentShaderFile(BASE_DIRECTORY .. "shader.frag", true)
   addNodeAndRelease(scene, shaderNode1)

end

function addNodeAndRelease(scene, node)
    scene:addNode(node)
    node:release()
    return node
end
function getSnapshotT(scene)
  local node = KuruSnapshotNode.create()

  scene:addNode(node)
  node:release()

  return node
end