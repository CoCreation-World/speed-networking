/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
const areaIds = [24, 13, 15, 17, 18, 19, 21, 23];
const shadowLayers = areaIds.map(id => `${id}shadow`);

areaIds.forEach((id, index) => {
    const areaId = id.toString();
    const shadowLayer = shadowLayers[index];

    WA.room.area.onEnter(areaId).subscribe(async () => {
        let count = await WA.state.loadVariable(areaId) as number;
        WA.room.hideLayer('centerShadow');
        let newCount = count + 1;
        WA.state.saveVariable(areaId, newCount).catch(e => console.error('Error saving variable', e));
        WA.room.showLayer(shadowLayer);
    });

    WA.room.area.onLeave(areaId).subscribe(async () => {
        WA.room.showLayer('centerShadow');
        let count = await WA.state.loadVariable(areaId) as number;
        let newCount = count - 1;
        WA.state.saveVariable(areaId, newCount).catch(e => console.error('Error saving variable', e));
        WA.room.hideLayer(shadowLayer);
    });

    WA.state.onVariableChange(areaId).subscribe(async () => {
        let count = await WA.state.loadVariable(areaId) as number;
        if (count < 0) {
            await WA.state.saveVariable(areaId, 0).catch(e => console.error('Error saving variable', e));
        }
    });
});

// Hardcoded doorway events
WA.room.area.onEnter('doorwayOut24').subscribe(() => {
    WA.nav.goToRoom('#doorwayIn24');
});

WA.room.area.onEnter('doorwayIn24').subscribe(async () => {
    let count = await WA.state.loadVariable('24') as number;
    if (count === 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
    } else {
        WA.nav.goToRoom('#24');
    }
});

WA.room.area.onEnter('doorwayOut13').subscribe(() => {
    WA.nav.goToRoom('#doorwayIn13');
});

WA.room.area.onEnter('doorwayIn13').subscribe(async () => {
    let count = await WA.state.loadVariable('13') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('13');
});

WA.room.area.onEnter('doorwayOut15').subscribe(() => {
    WA.nav.goToRoom('doorwayIn15');
});

WA.room.area.onEnter('doorwayIn15').subscribe(async () => {
    let count = await WA.state.loadVariable('15') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('15');
});

WA.room.area.onEnter('doorwayOut17').subscribe(() => {
    WA.nav.goToRoom('doorwayIn17');
});

WA.room.area.onEnter('doorwayIn17').subscribe(async () => {
    let count = await WA.state.loadVariable('17') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('17');
});

WA.room.area.onEnter('doorwayOut18').subscribe(() => {
    WA.nav.goToRoom('doorwayIn18');
});

WA.room.area.onEnter('doorwayIn18').subscribe(async () => {
    let count = await WA.state.loadVariable('18') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('18');
});

WA.room.area.onEnter('doorwayOut19').subscribe(() => {
    WA.nav.goToRoom('doorwayIn19');
});

WA.room.area.onEnter('doorwayIn19').subscribe(async () => {
    let count = await WA.state.loadVariable('19') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('19');
});

WA.room.area.onEnter('doorwayOut21').subscribe(() => {
    WA.nav.goToRoom('doorwayIn21');
});

WA.room.area.onEnter('doorwayIn21').subscribe(async () => {
    let count = await WA.state.loadVariable('21') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('21');
});

WA.room.area.onEnter('doorwayOut23').subscribe(() => {
    WA.nav.goToRoom('doorwayIn23');
});

WA.room.area.onEnter('doorwayIn23').subscribe(async () => {
    let count = await WA.state.loadVariable('23') as number;
    if (count >= 2) {
        WA.chat.sendChatMessage('This area is already full', { scope: 'local', author: 'System' });
        WA.ui.banner.openBanner({
            id: 'areaFullBanner',
            text: 'This area is already full',
            bgColor: 'red',
            timeToClose: 5000,
            textColor: 'white',
            closable: true
        });
        return;
    }
    WA.nav.goToRoom('23');
});
