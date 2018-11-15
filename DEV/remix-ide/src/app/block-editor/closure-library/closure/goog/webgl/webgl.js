// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Constants used by the WebGL rendering, including all of the
 * constants used from the WebGL context.  For example, instead of using
 * context.ARRAY_BUFFER, your code can use
 * goog.webgl.ARRAY_BUFFER. The benefits for doing this include allowing
 * the compiler to optimize your code so that the compiled code does not have to
 * contain large strings to reference these properties, and reducing runtime
 * property access.
 *
 * Values are taken from the WebGL Spec:
 * https://www.khronos.org/registry/webgl/specs/1.0/#WEBGLRENDERINGCONTEXT
 */

goog.provide("goog.webgl")

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_BUFFER_BIT = 0x00000100

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BUFFER_BIT = 0x00000400

/**
 * @const
 * @type {number}
 */
goog.webgl.COLOR_BUFFER_BIT = 0x00004000

/**
 * @const
 * @type {number}
 */
goog.webgl.POINTS = 0x0000

/**
 * @const
 * @type {number}
 */
goog.webgl.LINES = 0x0001

/**
 * @const
 * @type {number}
 */
goog.webgl.LINE_LOOP = 0x0002

/**
 * @const
 * @type {number}
 */
goog.webgl.LINE_STRIP = 0x0003

/**
 * @const
 * @type {number}
 */
goog.webgl.TRIANGLES = 0x0004

/**
 * @const
 * @type {number}
 */
goog.webgl.TRIANGLE_STRIP = 0x0005

/**
 * @const
 * @type {number}
 */
goog.webgl.TRIANGLE_FAN = 0x0006

/**
 * @const
 * @type {number}
 */
goog.webgl.ZERO = 0

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE = 1

/**
 * @const
 * @type {number}
 */
goog.webgl.SRC_COLOR = 0x0300

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE_MINUS_SRC_COLOR = 0x0301

/**
 * @const
 * @type {number}
 */
goog.webgl.SRC_ALPHA = 0x0302

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE_MINUS_SRC_ALPHA = 0x0303

/**
 * @const
 * @type {number}
 */
goog.webgl.DST_ALPHA = 0x0304

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE_MINUS_DST_ALPHA = 0x0305

/**
 * @const
 * @type {number}
 */
goog.webgl.DST_COLOR = 0x0306

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE_MINUS_DST_COLOR = 0x0307

/**
 * @const
 * @type {number}
 */
goog.webgl.SRC_ALPHA_SATURATE = 0x0308

/**
 * @const
 * @type {number}
 */
goog.webgl.FUNC_ADD = 0x8006

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_EQUATION = 0x8009

/**
 * Same as BLEND_EQUATION
 * @const
 * @type {number}
 */
goog.webgl.BLEND_EQUATION_RGB = 0x8009

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_EQUATION_ALPHA = 0x883d

/**
 * @const
 * @type {number}
 */
goog.webgl.FUNC_SUBTRACT = 0x800a

/**
 * @const
 * @type {number}
 */
goog.webgl.FUNC_REVERSE_SUBTRACT = 0x800b

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_DST_RGB = 0x80c8

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_SRC_RGB = 0x80c9

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_DST_ALPHA = 0x80ca

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_SRC_ALPHA = 0x80cb

/**
 * @const
 * @type {number}
 */
goog.webgl.CONSTANT_COLOR = 0x8001

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE_MINUS_CONSTANT_COLOR = 0x8002

/**
 * @const
 * @type {number}
 */
goog.webgl.CONSTANT_ALPHA = 0x8003

/**
 * @const
 * @type {number}
 */
goog.webgl.ONE_MINUS_CONSTANT_ALPHA = 0x8004

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND_COLOR = 0x8005

/**
 * @const
 * @type {number}
 */
goog.webgl.ARRAY_BUFFER = 0x8892

/**
 * @const
 * @type {number}
 */
goog.webgl.ELEMENT_ARRAY_BUFFER = 0x8893

/**
 * @const
 * @type {number}
 */
goog.webgl.ARRAY_BUFFER_BINDING = 0x8894

/**
 * @const
 * @type {number}
 */
goog.webgl.ELEMENT_ARRAY_BUFFER_BINDING = 0x8895

/**
 * @const
 * @type {number}
 */
goog.webgl.STREAM_DRAW = 0x88e0

/**
 * @const
 * @type {number}
 */
goog.webgl.STATIC_DRAW = 0x88e4

/**
 * @const
 * @type {number}
 */
goog.webgl.DYNAMIC_DRAW = 0x88e8

/**
 * @const
 * @type {number}
 */
goog.webgl.BUFFER_SIZE = 0x8764

/**
 * @const
 * @type {number}
 */
goog.webgl.BUFFER_USAGE = 0x8765

/**
 * @const
 * @type {number}
 */
goog.webgl.CURRENT_VERTEX_ATTRIB = 0x8626

/**
 * @const
 * @type {number}
 */
goog.webgl.FRONT = 0x0404

/**
 * @const
 * @type {number}
 */
goog.webgl.BACK = 0x0405

/**
 * @const
 * @type {number}
 */
goog.webgl.FRONT_AND_BACK = 0x0408

/**
 * @const
 * @type {number}
 */
goog.webgl.CULL_FACE = 0x0b44

/**
 * @const
 * @type {number}
 */
goog.webgl.BLEND = 0x0be2

/**
 * @const
 * @type {number}
 */
goog.webgl.DITHER = 0x0bd0

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_TEST = 0x0b90

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_TEST = 0x0b71

/**
 * @const
 * @type {number}
 */
goog.webgl.SCISSOR_TEST = 0x0c11

/**
 * @const
 * @type {number}
 */
goog.webgl.POLYGON_OFFSET_FILL = 0x8037

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLE_ALPHA_TO_COVERAGE = 0x809e

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLE_COVERAGE = 0x80a0

/**
 * @const
 * @type {number}
 */
goog.webgl.NO_ERROR = 0

/**
 * @const
 * @type {number}
 */
goog.webgl.INVALID_ENUM = 0x0500

/**
 * @const
 * @type {number}
 */
goog.webgl.INVALID_VALUE = 0x0501

/**
 * @const
 * @type {number}
 */
goog.webgl.INVALID_OPERATION = 0x0502

/**
 * @const
 * @type {number}
 */
goog.webgl.OUT_OF_MEMORY = 0x0505

/**
 * @const
 * @type {number}
 */
goog.webgl.CW = 0x0900

/**
 * @const
 * @type {number}
 */
goog.webgl.CCW = 0x0901

/**
 * @const
 * @type {number}
 */
goog.webgl.LINE_WIDTH = 0x0b21

/**
 * @const
 * @type {number}
 */
goog.webgl.ALIASED_POINT_SIZE_RANGE = 0x846d

/**
 * @const
 * @type {number}
 */
goog.webgl.ALIASED_LINE_WIDTH_RANGE = 0x846e

/**
 * @const
 * @type {number}
 */
goog.webgl.CULL_FACE_MODE = 0x0b45

/**
 * @const
 * @type {number}
 */
goog.webgl.FRONT_FACE = 0x0b46

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_RANGE = 0x0b70

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_WRITEMASK = 0x0b72

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_CLEAR_VALUE = 0x0b73

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_FUNC = 0x0b74

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_CLEAR_VALUE = 0x0b91

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_FUNC = 0x0b92

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_FAIL = 0x0b94

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_PASS_DEPTH_FAIL = 0x0b95

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_PASS_DEPTH_PASS = 0x0b96

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_REF = 0x0b97

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_VALUE_MASK = 0x0b93

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_WRITEMASK = 0x0b98

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_FUNC = 0x8800

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_FAIL = 0x8801

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_PASS_DEPTH_PASS = 0x8803

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_REF = 0x8ca3

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_VALUE_MASK = 0x8ca4

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BACK_WRITEMASK = 0x8ca5

/**
 * @const
 * @type {number}
 */
goog.webgl.VIEWPORT = 0x0ba2

/**
 * @const
 * @type {number}
 */
goog.webgl.SCISSOR_BOX = 0x0c10

/**
 * @const
 * @type {number}
 */
goog.webgl.COLOR_CLEAR_VALUE = 0x0c22

/**
 * @const
 * @type {number}
 */
goog.webgl.COLOR_WRITEMASK = 0x0c23

/**
 * @const
 * @type {number}
 */
goog.webgl.UNPACK_ALIGNMENT = 0x0cf5

/**
 * @const
 * @type {number}
 */
goog.webgl.PACK_ALIGNMENT = 0x0d05

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_TEXTURE_SIZE = 0x0d33

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_VIEWPORT_DIMS = 0x0d3a

/**
 * @const
 * @type {number}
 */
goog.webgl.SUBPIXEL_BITS = 0x0d50

/**
 * @const
 * @type {number}
 */
goog.webgl.RED_BITS = 0x0d52

/**
 * @const
 * @type {number}
 */
goog.webgl.GREEN_BITS = 0x0d53

/**
 * @const
 * @type {number}
 */
goog.webgl.BLUE_BITS = 0x0d54

/**
 * @const
 * @type {number}
 */
goog.webgl.ALPHA_BITS = 0x0d55

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_BITS = 0x0d56

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_BITS = 0x0d57

/**
 * @const
 * @type {number}
 */
goog.webgl.POLYGON_OFFSET_UNITS = 0x2a00

/**
 * @const
 * @type {number}
 */
goog.webgl.POLYGON_OFFSET_FACTOR = 0x8038

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_BINDING_2D = 0x8069

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLE_BUFFERS = 0x80a8

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLES = 0x80a9

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLE_COVERAGE_VALUE = 0x80aa

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLE_COVERAGE_INVERT = 0x80ab

/**
 * @const
 * @type {number}
 */
goog.webgl.COMPRESSED_TEXTURE_FORMATS = 0x86a3

/**
 * @const
 * @type {number}
 */
goog.webgl.DONT_CARE = 0x1100

/**
 * @const
 * @type {number}
 */
goog.webgl.FASTEST = 0x1101

/**
 * @const
 * @type {number}
 */
goog.webgl.NICEST = 0x1102

/**
 * @const
 * @type {number}
 */
goog.webgl.GENERATE_MIPMAP_HINT = 0x8192

/**
 * @const
 * @type {number}
 */
goog.webgl.BYTE = 0x1400

/**
 * @const
 * @type {number}
 */
goog.webgl.UNSIGNED_BYTE = 0x1401

/**
 * @const
 * @type {number}
 */
goog.webgl.SHORT = 0x1402

/**
 * @const
 * @type {number}
 */
goog.webgl.UNSIGNED_SHORT = 0x1403

/**
 * @const
 * @type {number}
 */
goog.webgl.INT = 0x1404

/**
 * @const
 * @type {number}
 */
goog.webgl.UNSIGNED_INT = 0x1405

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT = 0x1406

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_COMPONENT = 0x1902

/**
 * @const
 * @type {number}
 */
goog.webgl.ALPHA = 0x1906

/**
 * @const
 * @type {number}
 */
goog.webgl.RGB = 0x1907

/**
 * @const
 * @type {number}
 */
goog.webgl.RGBA = 0x1908

/**
 * @const
 * @type {number}
 */
goog.webgl.LUMINANCE = 0x1909

/**
 * @const
 * @type {number}
 */
goog.webgl.LUMINANCE_ALPHA = 0x190a

/**
 * @const
 * @type {number}
 */
goog.webgl.UNSIGNED_SHORT_4_4_4_4 = 0x8033

/**
 * @const
 * @type {number}
 */
goog.webgl.UNSIGNED_SHORT_5_5_5_1 = 0x8034

/**
 * @const
 * @type {number}
 */
goog.webgl.UNSIGNED_SHORT_5_6_5 = 0x8363

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAGMENT_SHADER = 0x8b30

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_SHADER = 0x8b31

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_VERTEX_ATTRIBS = 0x8869

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_VERTEX_UNIFORM_VECTORS = 0x8dfb

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_VARYING_VECTORS = 0x8dfc

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8b4d

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8b4c

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_TEXTURE_IMAGE_UNITS = 0x8872

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_FRAGMENT_UNIFORM_VECTORS = 0x8dfd

/**
 * @const
 * @type {number}
 */
goog.webgl.SHADER_TYPE = 0x8b4f

/**
 * @const
 * @type {number}
 */
goog.webgl.DELETE_STATUS = 0x8b80

/**
 * @const
 * @type {number}
 */
goog.webgl.LINK_STATUS = 0x8b82

/**
 * @const
 * @type {number}
 */
goog.webgl.VALIDATE_STATUS = 0x8b83

/**
 * @const
 * @type {number}
 */
goog.webgl.ATTACHED_SHADERS = 0x8b85

/**
 * @const
 * @type {number}
 */
goog.webgl.ACTIVE_UNIFORMS = 0x8b86

/**
 * @const
 * @type {number}
 */
goog.webgl.ACTIVE_ATTRIBUTES = 0x8b89

/**
 * @const
 * @type {number}
 */
goog.webgl.SHADING_LANGUAGE_VERSION = 0x8b8c

/**
 * @const
 * @type {number}
 */
goog.webgl.CURRENT_PROGRAM = 0x8b8d

/**
 * @const
 * @type {number}
 */
goog.webgl.NEVER = 0x0200

/**
 * @const
 * @type {number}
 */
goog.webgl.LESS = 0x0201

/**
 * @const
 * @type {number}
 */
goog.webgl.EQUAL = 0x0202

/**
 * @const
 * @type {number}
 */
goog.webgl.LEQUAL = 0x0203

/**
 * @const
 * @type {number}
 */
goog.webgl.GREATER = 0x0204

/**
 * @const
 * @type {number}
 */
goog.webgl.NOTEQUAL = 0x0205

/**
 * @const
 * @type {number}
 */
goog.webgl.GEQUAL = 0x0206

/**
 * @const
 * @type {number}
 */
goog.webgl.ALWAYS = 0x0207

/**
 * @const
 * @type {number}
 */
goog.webgl.KEEP = 0x1e00

/**
 * @const
 * @type {number}
 */
goog.webgl.REPLACE = 0x1e01

/**
 * @const
 * @type {number}
 */
goog.webgl.INCR = 0x1e02

/**
 * @const
 * @type {number}
 */
goog.webgl.DECR = 0x1e03

/**
 * @const
 * @type {number}
 */
goog.webgl.INVERT = 0x150a

/**
 * @const
 * @type {number}
 */
goog.webgl.INCR_WRAP = 0x8507

/**
 * @const
 * @type {number}
 */
goog.webgl.DECR_WRAP = 0x8508

/**
 * @const
 * @type {number}
 */
goog.webgl.VENDOR = 0x1f00

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERER = 0x1f01

/**
 * @const
 * @type {number}
 */
goog.webgl.VERSION = 0x1f02

/**
 * @const
 * @type {number}
 */
goog.webgl.NEAREST = 0x2600

/**
 * @const
 * @type {number}
 */
goog.webgl.LINEAR = 0x2601

/**
 * @const
 * @type {number}
 */
goog.webgl.NEAREST_MIPMAP_NEAREST = 0x2700

/**
 * @const
 * @type {number}
 */
goog.webgl.LINEAR_MIPMAP_NEAREST = 0x2701

/**
 * @const
 * @type {number}
 */
goog.webgl.NEAREST_MIPMAP_LINEAR = 0x2702

/**
 * @const
 * @type {number}
 */
goog.webgl.LINEAR_MIPMAP_LINEAR = 0x2703

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_MAG_FILTER = 0x2800

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_MIN_FILTER = 0x2801

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_WRAP_S = 0x2802

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_WRAP_T = 0x2803

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_2D = 0x0de1

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE = 0x1702

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP = 0x8513

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_BINDING_CUBE_MAP = 0x8514

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE0 = 0x84c0

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE1 = 0x84c1

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE2 = 0x84c2

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE3 = 0x84c3

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE4 = 0x84c4

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE5 = 0x84c5

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE6 = 0x84c6

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE7 = 0x84c7

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE8 = 0x84c8

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE9 = 0x84c9

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE10 = 0x84ca

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE11 = 0x84cb

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE12 = 0x84cc

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE13 = 0x84cd

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE14 = 0x84ce

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE15 = 0x84cf

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE16 = 0x84d0

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE17 = 0x84d1

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE18 = 0x84d2

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE19 = 0x84d3

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE20 = 0x84d4

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE21 = 0x84d5

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE22 = 0x84d6

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE23 = 0x84d7

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE24 = 0x84d8

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE25 = 0x84d9

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE26 = 0x84da

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE27 = 0x84db

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE28 = 0x84dc

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE29 = 0x84dd

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE30 = 0x84de

/**
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE31 = 0x84df

/**
 * @const
 * @type {number}
 */
goog.webgl.ACTIVE_TEXTURE = 0x84e0

/**
 * @const
 * @type {number}
 */
goog.webgl.REPEAT = 0x2901

/**
 * @const
 * @type {number}
 */
goog.webgl.CLAMP_TO_EDGE = 0x812f

/**
 * @const
 * @type {number}
 */
goog.webgl.MIRRORED_REPEAT = 0x8370

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT_VEC2 = 0x8b50

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT_VEC3 = 0x8b51

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT_VEC4 = 0x8b52

/**
 * @const
 * @type {number}
 */
goog.webgl.INT_VEC2 = 0x8b53

/**
 * @const
 * @type {number}
 */
goog.webgl.INT_VEC3 = 0x8b54

/**
 * @const
 * @type {number}
 */
goog.webgl.INT_VEC4 = 0x8b55

/**
 * @const
 * @type {number}
 */
goog.webgl.BOOL = 0x8b56

/**
 * @const
 * @type {number}
 */
goog.webgl.BOOL_VEC2 = 0x8b57

/**
 * @const
 * @type {number}
 */
goog.webgl.BOOL_VEC3 = 0x8b58

/**
 * @const
 * @type {number}
 */
goog.webgl.BOOL_VEC4 = 0x8b59

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT_MAT2 = 0x8b5a

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT_MAT3 = 0x8b5b

/**
 * @const
 * @type {number}
 */
goog.webgl.FLOAT_MAT4 = 0x8b5c

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLER_2D = 0x8b5e

/**
 * @const
 * @type {number}
 */
goog.webgl.SAMPLER_CUBE = 0x8b60

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_SIZE = 0x8623

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_TYPE = 0x8625

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886a

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_POINTER = 0x8645

/**
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889f

/**
 * @const
 * @type {number}
 */
goog.webgl.COMPILE_STATUS = 0x8b81

/**
 * @const
 * @type {number}
 */
goog.webgl.LOW_FLOAT = 0x8df0

/**
 * @const
 * @type {number}
 */
goog.webgl.MEDIUM_FLOAT = 0x8df1

/**
 * @const
 * @type {number}
 */
goog.webgl.HIGH_FLOAT = 0x8df2

/**
 * @const
 * @type {number}
 */
goog.webgl.LOW_INT = 0x8df3

/**
 * @const
 * @type {number}
 */
goog.webgl.MEDIUM_INT = 0x8df4

/**
 * @const
 * @type {number}
 */
goog.webgl.HIGH_INT = 0x8df5

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER = 0x8d40

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER = 0x8d41

/**
 * @const
 * @type {number}
 */
goog.webgl.RGBA4 = 0x8056

/**
 * @const
 * @type {number}
 */
goog.webgl.RGB5_A1 = 0x8057

/**
 * @const
 * @type {number}
 */
goog.webgl.RGB565 = 0x8d62

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_COMPONENT16 = 0x81a5

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_INDEX = 0x1901

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_INDEX8 = 0x8d48

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_STENCIL = 0x84f9

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_WIDTH = 0x8d42

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_HEIGHT = 0x8d43

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_INTERNAL_FORMAT = 0x8d44

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_RED_SIZE = 0x8d50

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_GREEN_SIZE = 0x8d51

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_BLUE_SIZE = 0x8d52

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_ALPHA_SIZE = 0x8d53

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_DEPTH_SIZE = 0x8d54

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_STENCIL_SIZE = 0x8d55

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8cd0

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8cd1

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8cd2

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8cd3

/**
 * @const
 * @type {number}
 */
goog.webgl.COLOR_ATTACHMENT0 = 0x8ce0

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_ATTACHMENT = 0x8d00

/**
 * @const
 * @type {number}
 */
goog.webgl.STENCIL_ATTACHMENT = 0x8d20

/**
 * @const
 * @type {number}
 */
goog.webgl.DEPTH_STENCIL_ATTACHMENT = 0x821a

/**
 * @const
 * @type {number}
 */
goog.webgl.NONE = 0

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_COMPLETE = 0x8cd5

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8cd6

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8cd7

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8cd9

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_UNSUPPORTED = 0x8cdd

/**
 * @const
 * @type {number}
 */
goog.webgl.FRAMEBUFFER_BINDING = 0x8ca6

/**
 * @const
 * @type {number}
 */
goog.webgl.RENDERBUFFER_BINDING = 0x8ca7

/**
 * @const
 * @type {number}
 */
goog.webgl.MAX_RENDERBUFFER_SIZE = 0x84e8

/**
 * @const
 * @type {number}
 */
goog.webgl.INVALID_FRAMEBUFFER_OPERATION = 0x0506

/**
 * @const
 * @type {number}
 */
goog.webgl.UNPACK_FLIP_Y_WEBGL = 0x9240

/**
 * @const
 * @type {number}
 */
goog.webgl.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241

/**
 * @const
 * @type {number}
 */
goog.webgl.CONTEXT_LOST_WEBGL = 0x9242

/**
 * @const
 * @type {number}
 */
goog.webgl.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243

/**
 * @const
 * @type {number}
 */
goog.webgl.BROWSER_DEFAULT_WEBGL = 0x9244

/**
 * From the OES_texture_half_float extension.
 * http://www.khronos.org/registry/webgl/extensions/OES_texture_half_float/
 * @const
 * @type {number}
 */
goog.webgl.HALF_FLOAT_OES = 0x8d61

/**
 * From the OES_standard_derivatives extension.
 * http://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/
 * @const
 * @type {number}
 */
goog.webgl.FRAGMENT_SHADER_DERIVATIVE_HINT_OES = 0x8b8b

/**
 * From the OES_vertex_array_object extension.
 * http://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/
 * @const
 * @type {number}
 */
goog.webgl.VERTEX_ARRAY_BINDING_OES = 0x85b5

/**
 * From the WEBGL_debug_renderer_info extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
 * @const
 * @type {number}
 */
goog.webgl.UNMASKED_VENDOR_WEBGL = 0x9245

/**
 * From the WEBGL_debug_renderer_info extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
 * @const
 * @type {number}
 */
goog.webgl.UNMASKED_RENDERER_WEBGL = 0x9246

/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
goog.webgl.COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83f0

/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
goog.webgl.COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83f1

/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
goog.webgl.COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83f2

/**
 * From the WEBGL_compressed_texture_s3tc extension.
 * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
 * @const
 * @type {number}
 */
goog.webgl.COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83f3

/**
 * From the EXT_texture_filter_anisotropic extension.
 * http://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
 * @const
 * @type {number}
 */
goog.webgl.TEXTURE_MAX_ANISOTROPY_EXT = 0x84fe

/**
 * From the EXT_texture_filter_anisotropic extension.
 * http://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
 * @const
 * @type {number}
 */
goog.webgl.MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84ff
