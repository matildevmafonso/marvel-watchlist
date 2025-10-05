const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electronAPI", {
    loadPage: (page) => ipcRenderer.invoke("load-page", page),
});