input.onButtonPressed(Button.A, function () {
    activateLights()
})
function win () {
    radio.sendString("S")
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Lys på") {
        activateLights()
        lightsOnTime = input.runningTime()
    } else if (receivedString == "Lys av") {
        win()
        activateLights()
    } else if (receivedString == "reset") {
        control.reset()
    }
})
function activateLights () {
    lightsOn = !(lightsOn)
    lightsOnTime = input.runningTime()
    pins.digitalWritePin(lightsPin, 1)
led.toggleAll();
basic.pause(onDuration)
    led.toggleAll();
pins.digitalWritePin(lightsPin, 0)
}
let lightsOn = false
let lightsOnTime = 0
let onDuration = 0
let turbineIsRunning = false
let turbineOnTime = 0
radio.setGroup(6)
basic.showIcon(IconNames.Happy)
// 15 sec timeout
let turbineTimeout = 15000
let lightsOnTimeout = 10000
onDuration = 1100
let lightsPin = DigitalPin.P0
basic.forever(function () {
    if (lightsOn) {
        led.plot(0, 0)
        if (input.runningTime() > lightsOnTime + lightsOnTimeout) {
            activateLights()
        }
    } else {
        led.unplot(0, 0)
    }
})
