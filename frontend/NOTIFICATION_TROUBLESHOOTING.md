# Notification Troubleshooting Guide

## 🚨 **Notifications Not Working? Let's Fix This!**

If you enabled notifications but aren't seeing them, follow this step-by-step troubleshooting guide.

## 🔍 **Step 1: Check Console Logs**

1. **Open browser console** (F12 → Console tab)
2. **Look for these messages** when you:
   - Load the page
   - Click "Enable Notifications"
   - Complete a timer session

**Expected console output:**
```
Requesting notification permission...
Notifications API is supported
Permission result: granted
Attempting to show notification: { title: "...", body: "...", notificationsEnabled: true }
Notification created successfully: [object Notification]
Notification shown
```

## 🧪 **Step 2: Test Notifications Immediately**

1. **Look for the "🧪 Test Notification" button** (should appear when notifications are enabled)
2. **Click it** to test notifications right now
3. **Check console** for any error messages
4. **Look for notification** on your screen

## 🚫 **Step 3: Common Issues & Fixes**

### **Issue: "Notifications API not supported"**
**Fix:** Update your browser to a modern version
- Chrome: Version 22+
- Firefox: Version 22+
- Safari: macOS 10.9+

### **Issue: "Permission result: denied"**
**Fix:** Manually enable notifications
1. **Click the notification button** in address bar
2. **Select "Allow"** from the dropdown
3. **Refresh the page**

### **Issue: "Cannot show notification"**
**Fix:** Check notification state
1. **Look at the UI** - does it show "✅ Notifications enabled"?
2. **Check browser settings** - ensure notifications aren't blocked
3. **Try incognito mode** to test

### **Issue: "Notification created successfully" but nothing appears**
**Fix:** Check OS notification settings
1. **Windows**: Settings → System → Notifications
2. **macOS**: System Preferences → Notifications
3. **Linux**: Check your desktop environment settings

## 🔧 **Step 4: Browser-Specific Fixes**

### **Chrome/Edge:**
1. **Click the lock icon** in address bar
2. **Set "Notifications" to "Allow"**
3. **Refresh the page**

### **Firefox:**
1. **Click the shield icon** in address bar
2. **Set "Notifications" to "Allow"**
3. **Refresh the page**

### **Safari:**
1. **Safari → Preferences → Websites**
2. **Select "Notifications"**
3. **Set your site to "Allow"**

## 🎯 **Step 5: Test Timer Notifications**

1. **Set work duration to 1 minute** (for quick testing)
2. **Start the timer**
3. **Switch to another window/tab**
4. **Wait for completion**
5. **Look for notification**

**Expected behavior:**
- Timer counts down: 1:00 → 0:59 → ... → 0:00
- Console shows: "Work session completed, showing notification..."
- Notification appears: "Work Session Complete! 🎯"

## 🐛 **Step 6: Debug Information**

### **What to check in console:**
- ✅ Permission request logs
- ✅ Notification creation logs
- ✅ Timer completion logs
- ❌ Any error messages

### **What to check in UI:**
- ✅ "✅ Notifications enabled" message
- ✅ "🧪 Test Notification" button
- ✅ Timer functionality working

### **What to check in browser:**
- ✅ Notification permission granted
- ✅ Site not blocked
- ✅ Browser supports notifications

## 🚀 **Step 7: Alternative Solutions**

### **If notifications still don't work:**
1. **Try a different browser** (Chrome, Firefox, Edge)
2. **Check if notifications work on other sites**
3. **Restart your browser**
4. **Clear browser data and try again**

### **Fallback notification:**
The app also updates the **browser tab title** when timers complete, so you'll still see:
- `00:00 • Focus` when work completes
- `00:00 • Break` when break completes

## 📱 **Step 8: Mobile/Tablet Issues**

### **Mobile browsers:**
- **Limited notification support**
- **May only work when app is active**
- **Consider using desktop version**

### **Tablets:**
- **Similar limitations to mobile**
- **Check browser notification settings**
- **Try desktop mode**

## 🎯 **Success Checklist**

You'll know it's working when:
- ✅ Console shows permission granted
- ✅ UI shows "✅ Notifications enabled"
- ✅ Test notification button works
- ✅ Timer notifications appear
- ✅ Notifications work in other windows

## 🆘 **Still Not Working?**

If you're still having issues:

1. **Copy all console logs** and share them
2. **Note your browser and OS** version
3. **Describe exactly what happens** when you try to enable notifications
4. **Check if other websites' notifications work**

## 💡 **Pro Tips**

1. **Always check console first** - it shows exactly what's happening
2. **Test with short timers** (1 minute) for quick debugging
3. **Use the test button** to verify notifications work immediately
4. **Check OS notification settings** - browsers can't override OS blocks
5. **Try incognito mode** to rule out extension interference

The debugging logs should show exactly where the issue is! 🔍 