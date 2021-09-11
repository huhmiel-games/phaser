/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = require('../../utils/Class');
var Components = require('../components');
var GameObject = require('../GameObject');
var IntegerToColor = require('../../display/color/IntegerToColor');
var PIPELINES_CONST = require('../../renderer/webgl/pipelines/const');
var Render = require('./PointLightRender');

/**
 * @classdesc
 * TODO
 *
 * @class PointLight
 * @extends Phaser.GameObjects.GameObject
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.50.0
 *
 * @extends Phaser.GameObjects.Components.AlphaSingle
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Mask
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Scene} scene - The Scene to which this Point Light belongs. A Point Light can only belong to one Scene at a time.
 * @param {number} x - The horizontal position of this Point Light in the world.
 * @param {number} y - The vertical position of this Point Light in the world.
 * @param {number} [color=0xffffff] - The color of the Point Light, given as a hex value.
 * @param {number} [radius=128] - The radius of the Point Light.
 * @param {number} [intensity=1] - The intensity, or color blend, of the Point Light.
 * @param {number} [attenuation=0.1] - The attenuation  of the Point Light. This is the reduction of light from the center point.
 */
var PointLight = new Class({

    Extends: GameObject,

    Mixins: [
        Components.AlphaSingle,
        Components.BlendMode,
        Components.Depth,
        Components.GetBounds,
        Components.Mask,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible,
        Render
    ],

    initialize:

    function PointLight (scene, x, y, color, radius, intensity, attenuation)
    {
        if (color === undefined) { color = 0xffffff; }
        if (radius === undefined) { radius = 128; }
        if (intensity === undefined) { intensity = 1; }
        if (attenuation === undefined) { attenuation = 0.1; }

        GameObject.call(this, scene, 'PointLight');

        this.initPipeline(PIPELINES_CONST.POINTLIGHT_PIPELINE);

        this.setPosition(x, y);

        this.color = IntegerToColor(color);

        this.intensity = intensity;
        this.attenuation = attenuation;

        //  read only:
        this.width = radius * 2;
        this.height = radius * 2;

        this._radius = radius;
    },

    radius: {

        get: function ()
        {
            return this._radius;
        },

        set: function (value)
        {
            this._radius = value;
            this.width = value * 2;
            this.height = value * 2;
        }

    },

    originX: {

        get: function ()
        {
            return 0.5;
        }

    },

    originY: {

        get: function ()
        {
            return 0.5;
        }

    },

    displayOriginX: {

        get: function ()
        {
            return this._radius;
        }

    },

    displayOriginY: {

        get: function ()
        {
            return this._radius;
        }

    }

});

module.exports = PointLight;
