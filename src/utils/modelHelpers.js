/**
 * Model Helpers - Utilities for safely accessing GLB model nodes
 *
 * Different GLB models can have different node naming conventions.
 * These utilities provide safe access regardless of the structure.
 */

/**
 * Safely extracts mesh geometry from GLB model nodes
 * @param {Object} nodes - The nodes object from useGLTF hook
 * @returns {THREE.BufferGeometry|null} The geometry object or null if not found
 */
export const findMeshGeometry = (nodes) => {
  // Check common naming conventions first
  if (nodes.mesh?.geometry) return nodes.mesh.geometry;
  if (nodes.mesh_0?.geometry) return nodes.mesh_0.geometry;
  if (nodes.mesh_1?.geometry) return nodes.mesh_1.geometry;

  // Search all nodes for any mesh with geometry
  for (const key in nodes) {
    if (nodes[key]?.geometry && nodes[key].type === 'Mesh') {
      return nodes[key].geometry;
    }
  }

  return null;
};

/**
 * Safely extracts material from GLB model materials
 * @param {Object} materials - The materials object from useGLTF hook
 * @returns {THREE.Material|null} The material object or null if not found
 */
export const findMaterial = (materials) => {
  // Check common naming conventions
  if (materials.main) return materials.main;
  if (materials[""]) return materials[""];

  // Return first available material
  const keys = Object.keys(materials);
  if (keys.length > 0) {
    return materials[keys[0]];
  }

  return null;
};
