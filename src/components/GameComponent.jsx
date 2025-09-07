import React, {useEffect} from 'react';
import Phaser from 'phaser';

import GameState from '../states/gameState.js';
import KitchenState from '../states/KitchenState.js'
import LoadState from '../states/LoadState.js';
import BootState from '../states/BootState.js';
import MenuState from '../states/MenuState.js';
import OrderState from '../states/OrderState.js';
import SettingsState from '../states/SettingsState.js'
import ShakeState from '../states/ShakeState.js'
import ShopState from '../states/ShopState.js';



const GameComponent = ({config}) => {
    useEffect(() => {
        
    const game = new Phaser.Game(config);

    if (config.physics.arcade.gravity.y>150){ // actual game has gravity of 200
        game.scene.add('LoadState', LoadState, false);
        game.scene.add("ShakeState",ShakeState,false)
        game.scene.add('GameState', GameState, false);
        game.scene.add('KitchenState',KitchenState,false);
        game.scene.add('ShopState',ShopState,false);
        game.scene.add('MenuState',MenuState,false);
        game.scene.add('BootState',BootState,false);
        game.scene.add("OrderState",OrderState,false);
        game.scene.add("SettingsState",SettingsState,false);
        game.scene.start('BootState');
    
    }

    return() => {
        game.destroy(true);
    }
    }, []);
    return (
        <div id = "phaser-container" style={{}}>
        </div>
    )
}

export default GameComponent;