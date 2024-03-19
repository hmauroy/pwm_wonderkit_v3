function mainLoop () {
    while (true) {
        basic.pause(1)
        airbit.MotorSpeed(
        pwm0,
        pwm1,
        pwm2,
        pwm3
        )
    }
}
input.onButtonPressed(Button.A, function () {
    pwm0 = 0
    pwm1 = 0
    pwm2 = 0
    pwm3 = 0
})
input.onButtonPressed(Button.AB, function () {
    pwm2 = 0
})
input.onButtonPressed(Button.B, function () {
    pwm0 = 200
    pwm1 = 200
    pwm2 = 200
    pwm3 = 200
})
radio.onReceivedValue(function (name, value) {
    radioReceivedTime = input.runningTime()
    if (name == "P") {
        pitch = value / -3
        pitch = Math.constrain(pitch, -15, 15)
    }
    if (name == "A") {
        arm = value
    }
    if (name == "R") {
        roll = value / 3
        roll = Math.constrain(roll, -15, 15)
    }
    if (name == "T") {
        throttle = value
        throttle = Math.constrain(throttle, 0, 100)
        if (batterymVoltSmooth < 3400) {
            throttle = Math.constrain(throttle, 0, 75)
        }
    }
    if (name == "Y") {
        yaw += value * 0.1
    }
})
let yaw = 0
let throttle = 0
let roll = 0
let arm = 0
let pitch = 0
let radioReceivedTime = 0
let pwm3 = 0
let pwm1 = 0
let pwm0 = 0
let pwm2 = 0
let batterymVoltSmooth = 0
let imuYaw = 0
let batteryVolt = 0
let mcExists = false
let gyroExists = false
let imuPitch = 0
let imuRoll = 0
let motorA = 0
let motorC = 0
let motorB = 0
let motorD = 0
let stable = true
let notCharging = true
let radioGroup = 7
basic.showNumber(radioGroup)
basic.pause(200)
batterymVoltSmooth = 3700
// Default: 0.7
let rollPitchP = 0.9
let rollPitchI = 0.004
let rollPitchD = 15
// Default: 4
let yawP = 5
// Default: 10
let yawD = 70
pwm2 = 0
let expoSetting = 2
let expoFactor = 45 * 45 / (45 - 45 / expoSetting)
radio.setGroup(radioGroup)
i2crr.setI2CPins(DigitalPin.P2, DigitalPin.P1)
// i2crr.setI2CPins(DigitalPin.P2, DigitalPin.P1)
basic.pause(100)
basic.pause(100)
airbit.PCA_Start()
basic.showString("M")
basic.forever(function () {
    basic.showNumber(pwm2)
    basic.pause(500)
})
basic.forever(function () {
    mainLoop()
})
