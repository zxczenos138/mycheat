var scriptName = "zenosCombo"; // The name of your script
var scriptVersion = 6.6; // The version of your script 
var scriptAuthor = "zxczenos138"; // The author of your script (eg. your username)

function zenosCombo() {
    var amountValue = IntegerValue("Packets", 200, 0, 500)
    var swingValue = ListValue("SwingMode", arrayOf("Normal","Packet"), "Normal")
    var onlyAuraValue = BoolValue("OnlyAura", false)
    var gameBreaking = BoolValue("GameBreaking", false)

    this.getName = function() {
        return "zenosCombo";
    }

    this.getDescription = function() {
        return "deals Combo hits";
    }

    this.getCategory = function() {
        return "COMBAT";
    }
    this.getTag = function() {
        return mode.get()
    }

    @EventTarget
    fun onAttack(event: AttackEvent) {
        fun sendPacket() {
            mc.netHandler.addToSendQueue(C02PacketUseEntity(event.targetEntity, C02PacketUseEntity.Action.ATTACK))
        }
        fun swingPacket() {
            when(swingValue.get().lowercase()) {
                "normal" -> mc.thePlayer.swingItem()

                "packet" -> mc.netHandler.addToSendQueue(C0APacketAnimation())
            }
        }
        if (onlyAuraValue.get() && !FDPClient.moduleManager[KillAura::class.java]!!.state && !FDPClient.moduleManager[InfiniteAura::class.java]!!.state) return

        repeat (amountValue.get()) {
            swingPacket()
            sendPacket()
        }
        if (gameBreaking.get()) {
            repeat (amountValue.get()) {
                swingPacket()
                repeat(3) {
                    sendPacket()
                }
            }
        }
    }
}
