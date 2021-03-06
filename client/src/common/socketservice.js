var module = angular.module('socket.io',[]);
module.provider('$socket',function $socketProvider() {
    this.ioUrl = '';
    this.ioConfig = {};
    this.setConnectionUrl = function setConnectionUrl(url){
        if (typeof url == 'string') {
            ioUrl = url;
        }else {
            throw new TypeError('url must be of type string');
        }
    };
    function setOption(name, value, type) {
        if (typeof value != type) {
            throw new TypeError("'"+ name +"' must be of type '"+ type + "'");
        }
        ioConfig[name] = value;
    };
    
    this.setResource = function setResource(value) {
        setOption('resource', value, 'string');
    };
    this.setConnectTimeout = function setConnectTimeout(value) {
        setOption('connect timeout', value, 'number');
    };
    this.setTryMultipleTransports = function setTryMultipleTransports(value) {
        setOption('try multiple transports', value, 'boolean');
    };
    this.setReconnect = function setReconnect(value) {
        setOption('reconnect', value, 'boolean');
    };
    this.setReconnectionDelay = function setReconnectionDelay(value) {
        setOption('reconnection delay', value, 'number');
    };
    this.setReconnectionLimit = function setReconnectionLimit(value) {
        setOption('reconnection limit', value, 'number');
    };
    this.setMaxReconnectionAttempts = function      setMaxReconnectionAttempts(value) {
        setOption('max reconnection attempts', value, 'number');
    };
    this.setSyncDisconnectOnUnload = function setSyncDisconnectOnUnload(value) {
        setOption('sync disconnect on unload', value, 'boolean');
    };
    this.setAutoConnect = function setAutoConnect(value) {
        setOption('auto connect', value, 'boolean');
    };
    this.setFlashPolicyPort = function setFlashPolicyPort(value) {
        setOption('flash policy port', value, 'number')
    };
    this.setForceNewConnection = function setForceNewConnection(value) {
        setOption('force new connection', value, 'boolean');
    };
      
    this.$get = function $socketFactory($rootScope) {
        var socket = io(ioUrl, ioConfig);
        return {
            on: function on(event, callback) {
                socket.on(event, function (arguments) {
                    var args = arguments;
                   $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            }, 
            off: function off(event, callback) {
               if (typeof callback == 'function') {
                    socket.removeListener(event, callback);
                } else {
                    socket.removeAllListeners(event);
                }
            },
            emit: function emit(event, data, callback) {
                    if (typeof callback == 'function') {
                        socket.emit(event, data, function () {
                            var args = arguments;
                            $rootScope.$apply(function () {
                                callback.apply(socket, args);
                            });
                        });
                    } else {
                        socket.emit(event, data);
                    }
            }           
        };
    };


});