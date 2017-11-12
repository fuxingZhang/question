module.exports = {
  async crossOrigin(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Accept, X-Requested-With,x-access-token,x-admin-token"
    );
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

    if (ctx.method.toUpperCase() === "OPTIONS") {
      ctx.status = 200;
    } else {
      await next();
    }
  }
}
