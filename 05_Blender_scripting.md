# Blender Scripting with chatGPT

🤓 **Prompting an AI**

🤖 *AI answers*

💬 Commenting on what happened



🤓 : **Write a blender script (for blender 3.6) that will creative 50 3D primitives randomly amongst :**
- **uv sphere**
- **cube**
- **cone**
- **cylinder**
- **torus**
**those shape should be distributed randomly around the world origin within a maximum radius of 20 meters; their scale should be also randomly set within a 0.5 - 2.0 range.**

**You should also create two materials :**
- **one named "red plastic" that should look like a red plastic**
- **one named "water" that should be transparent and look like water.**
**Those two materials should be applied randomely to each shape created.**


🤖 :

``` py
import bpy
import random

# Clear existing mesh objects in the scene
bpy.ops.wm.open_mainfile(filepath=bpy.data.filepath, display_warning=False)
bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()

# Create materials
red_plastic_material = bpy.data.materials.new(name="Red Plastic")
red_plastic_material.diffuse_color = (1, 0, 0, 1)  # Red color
red_plastic_material.specular_intensity = 0.5

water_material = bpy.data.materials.new(name="Water")
water_material.use_nodes = True
nodes = water_material.node_tree.nodes
bsdf = nodes["Principled BSDF"]
bsdf.inputs["Transmission"].default_value = 1.0
bsdf.inputs["Transmission Roughness"].default_value = 0.0
bsdf.inputs["Base Color"].default_value = (0, 0, 1, 0.5)  # Blue color with transparency

# Function to create random 3D primitives
def create_random_primitive():
    shapes = ['UV_SPHERE', 'CUBE', 'CONE', 'CYLINDER', 'TORUS']
    shape = random.choice(shapes)
    
    x = random.uniform(-20, 20)
    y = random.uniform(-20, 20)
    z = random.uniform(-20, 20)
    
    scale_factor = random.uniform(0.5, 2.0)
    
    bpy.ops.mesh.primitive_ico_sphere_add(radius=1, subdivisions=2, location=(x, y, z))
    obj = bpy.context.object
    bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))
    
    if shape == 'CUBE':
        bpy.ops.mesh.primitive_cube_add(size=2, location=(x, y, z))
    elif shape == 'CONE':
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=1, depth=2, location=(x, y, z))
    elif shape == 'CYLINDER':
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=1, depth=2, location=(x, y, z))
    elif shape == 'TORUS':
        bpy.ops.mesh.primitive_torus_add(align='WORLD', location=(x, y, z))
    
    # Apply random material
    if random.random() < 0.5:
        obj.data.materials.append(red_plastic_material)
    else:
        obj.data.materials.append(water_material)

# Create 50 random primitives
for _ in range(50):
    create_random_primitive()
```

🤓 : **This script yields an error :**

**Python: Traceback (most recent call last):
  File "\Text", line 5, in <module>
  File "C:\Program Files\Blender Foundation\Blender 3.6\3.6\scripts\modules\bpy\ops.py", line 113, in __call__
    ret = _op_call(self.idname_py(), None, kw)
TypeError: Converting py args to operator properties: : keyword "display_warning" unrecognized**

🤖 :

I apologize for the error. It seems there was an issue with the display_warning keyword argument in the bpy.ops.wm.open_mainfile function. This argument is no longer recognized in Blender 3.6. You can simply remove it to fix the error. Here's the updated script

```py
import bpy
import random

# Clear existing mesh objects in the scene
bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()

# Create materials
red_plastic_material = bpy.data.materials.new(name="Red Plastic")
red_plastic_material.diffuse_color = (1, 0, 0, 1)  # Red color
red_plastic_material.specular_intensity = 0.5

water_material = bpy.data.materials.new(name="Water")
water_material.use_nodes = True
nodes = water_material.node_tree.nodes
bsdf = nodes["Principled BSDF"]
bsdf.inputs["Transmission"].default_value = 1.0
bsdf.inputs["Transmission Roughness"].default_value = 0.0
bsdf.inputs["Base Color"].default_value = (0, 0, 1, 0.5)  # Blue color with transparency

# Function to create random 3D primitives
def create_random_primitive():
    shapes = ['UV_SPHERE', 'CUBE', 'CONE', 'CYLINDER', 'TORUS']
    shape = random.choice(shapes)
    
    x = random.uniform(-20, 20)
    y = random.uniform(-20, 20)
    z = random.uniform(-20, 20)
    
    scale_factor = random.uniform(0.5, 2.0)
    
    bpy.ops.mesh.primitive_ico_sphere_add(radius=1, subdivisions=2, location=(x, y, z))
    obj = bpy.context.object
    bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))
    
    if shape == 'CUBE':
        bpy.ops.mesh.primitive_cube_add(size=2, location=(x, y, z))
    elif shape == 'CONE':
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=1, depth=2, location=(x, y, z))
    elif shape == 'CYLINDER':
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=1, depth=2, location=(x, y, z))
    elif shape == 'TORUS':
        bpy.ops.mesh.primitive_torus_add(align='WORLD', location=(x, y, z))
    
    # Apply random material
    if random.random() < 0.5:
        obj.data.materials.append(red_plastic_material)
    else:
        obj.data.materials.append(water_material)

# Create 50 random primitives
for _ in range(50):
    create_random_primitive()

```

*Remove the display_warning keyword, and this should work without errors in Blender 3.6.*

🤓 : **Thank you but some shape don't have a material can you fix it ?**

🤖 : *I apologize for the oversight. To ensure that every shape has a material, we can modify the script to apply a material to each newly created primitive. Here's the updated script:*

```py
import bpy
import random

# Clear existing mesh objects in the scene
bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()

# Create materials
red_plastic_material = bpy.data.materials.new(name="Red Plastic")
red_plastic_material.diffuse_color = (1, 0, 0, 1)  # Red color
red_plastic_material.specular_intensity = 0.5

water_material = bpy.data.materials.new(name="Water")
water_material.use_nodes = True
nodes = water_material.node_tree.nodes
bsdf = nodes["Principled BSDF"]
bsdf.inputs["Transmission"].default_value = 1.0
bsdf.inputs["Transmission Roughness"].default_value = 0.0
bsdf.inputs["Base Color"].default_value = (0, 0, 1, 0.5)  # Blue color with transparency

# Function to create random 3D primitives with materials
def create_random_primitive():
    shapes = ['UV_SPHERE', 'CUBE', 'CONE', 'CYLINDER', 'TORUS']
    shape = random.choice(shapes)
    
    x = random.uniform(-20, 20)
    y = random.uniform(-20, 20)
    z = random.uniform(-20, 20)
    
    scale_factor = random.uniform(0.5, 2.0)
    
    if shape == 'UV_SPHERE':
        bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(x, y, z))
    elif shape == 'CUBE':
        bpy.ops.mesh.primitive_cube_add(size=2, location=(x, y, z))
    elif shape == 'CONE':
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=1, depth=2, location=(x, y, z))
    elif shape == 'CYLINDER':
        bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=1, depth=2, location=(x, y, z))
    elif shape == 'TORUS':
        bpy.ops.mesh.primitive_torus_add(align='WORLD', location=(x, y, z))
    
    obj = bpy.context.object
    bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))
    
    # Apply random material
    if random.random() < 0.5:
        obj.data.materials.append(red_plastic_material)
    else:
        obj.data.materials.append(water_material)

# Create 50 random primitives with materials
for _ in range(50):
    create_random_primitive()
```

*This script ensures that each shape has a material applied. It randomly selects a material (either "Red Plastic" or "Water") for each primitive created.*




