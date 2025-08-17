# Pomodoro Timer Notifications Guide

## 🎯 **What You Get**

The timer now shows **desktop notifications** when:
- ✅ **Work sessions complete** → Switch to break mode
- ✅ **Break sessions complete** → Switch to work mode

These notifications work **even when you're in a different window or tab**!

## 🔔 **How Notifications Work**

### **Web Notifications API**
- Uses the browser's built-in notification system
- Shows notifications at the OS level (like system notifications)
- Works even when the browser tab isn't active
- Appears on top of other applications

### **Notification Types**

#### **Work Session Complete:**
```
Title: "Work Session Complete! 🎯"
Body: "Great job! Take a 5-minute break. Cycles completed: 1"
```

#### **Break Complete:**
```
Title: "Break Complete! ⏰"
Body: "Break time is over. Ready for your next 25-minute focus session?"
```

## 🚀 **How to Enable Notifications**

### **Automatic (Recommended):**
1. **Load the app** - Permission request appears automatically
2. **Click "Allow"** when browser asks for notification permission
3. **Notifications are enabled** - You'll see "✅ Notifications enabled"

### **Manual (If needed):**
1. **Click the "🔔 Enable Notifications" button**
2. **Grant permission** when prompted
3. **Notifications are now active**

## 🧪 **Testing the Notifications**

### **Test 1: Basic Notification**
1. **Enable notifications** (click the button if needed)
2. **Start timer** in work mode
3. **Switch to another window/tab** (important!)
4. **Wait for work session to complete**
5. **Check for notification** - should appear even in other window

### **Test 2: Break Notification**
1. **Let break session complete**
2. **Look for break completion notification**
3. **Verify it switches to work mode**

### **Test 3: Cross-Window Notifications**
1. **Open Pomodoro timer in one tab**
2. **Switch to a completely different application**
3. **Wait for timer completion**
4. **Notification should appear over other apps**

## 📱 **Notification Behavior**

### **What Happens:**
- **Notification appears** at OS level
- **Timer automatically switches** to next mode
- **Time resets** to full duration for new mode
- **Cycles increment** (work sessions only)

### **Notification Settings:**
- **Icon**: Uses favicon (you can customize this)
- **Sound**: Default system notification sound
- **Duration**: Auto-dismisses after a few seconds
- **Interaction**: Click to focus the browser tab

## 🔧 **Technical Details**

### **Permission States:**
- **Default**: Notifications disabled
- **Granted**: Notifications enabled and working
- **Denied**: Notifications blocked (user must manually enable)

### **Browser Support:**
- ✅ **Chrome/Edge**: Full support
- ✅ **Firefox**: Full support  
- ✅ **Safari**: Limited support (macOS only)
- ❌ **Mobile browsers**: Limited support

### **Fallback Behavior:**
- If notifications aren't supported, timer still works normally
- Only the notification feature is disabled
- All other functionality remains intact

## 🎨 **Customization Options**

### **Change Notification Text:**
Edit the notification messages in `App.jsx`:

```javascript
// Work completion notification
showNotification(
  'Work Session Complete! 🎯',  // Change this title
  `Great job! Take a ${breakMins}-minute break. Cycles completed: ${cycles + 1}`  // Change this body
);

// Break completion notification  
showNotification(
  'Break Complete! ⏰',  // Change this title
  `Break time is over. Ready for your next ${workMins}-minute focus session?`  // Change this body
);
```

### **Add Custom Icons:**
Replace `/favicon.ico` with your own icon path:

```javascript
new Notification(title, {
  body: body,
  icon: '/path/to/your/icon.png',  // Custom icon
  badge: '/path/to/your/badge.png'  // Custom badge
});
```

## 🚨 **Troubleshooting**

### **Notifications Not Appearing:**
1. **Check permission** - Look for "✅ Notifications enabled"
2. **Browser settings** - Ensure notifications aren't blocked
3. **OS settings** - Check system notification permissions
4. **Try manual enable** - Click the notification button

### **Permission Denied:**
1. **Click the notification button** to request again
2. **Check browser address bar** for notification icon
3. **Clear browser data** and try again
4. **Use incognito mode** to test

### **Notifications Too Frequent:**
- Currently shows one per mode switch
- Uses `tag: 'pomodoro-timer'` to prevent duplicates
- Can modify timing in the notification logic

## 🎯 **Success Criteria**

You'll know it's working when:
- ✅ **Notification permission granted**
- ✅ **Notifications appear on timer completion**
- ✅ **Notifications work in other windows**
- ✅ **Timer switches modes automatically**
- ✅ **No duplicate notifications**

## 💡 **Pro Tips**

1. **Keep notifications enabled** for best experience
2. **Test in different windows** to verify cross-window functionality
3. **Customize notification text** to match your preferences
4. **Use system notification settings** to control sound/display
5. **Combine with browser tab title** for double notification

The notification system makes the Pomodoro timer much more useful for productivity! 🚀 