
export default (javaPager) => {
    return {
        pageNum:javaPager.pageNum,
        total:javaPager.total,
        pageSize:javaPager.pageSize,
        pages:javaPager.pages,
    }
}
