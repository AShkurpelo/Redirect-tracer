const defaultMessage = 'Available api commands:\n'
              + '\t/health                   - check if server responds\n'
              + '\t/proxies                  - list of available proxies\n'
              + '\t/trace?url=URL            - trace url redirects\n'
              + '\t/trace?url=URL&proxy=NAME - trace url redirects using one of available proxies\n';

module.exports.getDefaultMessage = _ => {
    return defaultMessage;
};