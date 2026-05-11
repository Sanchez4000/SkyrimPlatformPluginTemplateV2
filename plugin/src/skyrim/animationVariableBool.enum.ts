export enum AnimationVariableBool {
  /** Sets the actor into a motion driven state. Meaning his AI determines his actions. */
  bMotionDriven = "bMotionDriven",
  IsBeastRace = "IsBeastRace",
  IsSneaking = "IsSneaking",
  IsBleedingOut = "IsBleedingOut",
  IsCastingDual = "IsCastingDual",
  Is1HM = "Is1HM",
  IsCastingRight = "IsCastingRight",
  IsCastingLeft = "IsCastingLeft",
  IsBlockHit = "IsBlockHit",
  IsPlayer = "IsPlayer",
  IsNPC = "IsNPC",
  /** Returns true in certain animations such as when mounting or unmounting a horse or when standing up from a chair. */
  bIsSynced = "bIsSynced",
  /** Sets whether the actor can shout. Could possibly be used to cause insta-cool down for actors. */
  bVoiceReady = "bVoiceReady",
  bWantCastLeft = "bWantCastLeft",
  bWantCastRight = "bWantCastRight",
  bWantCastVoice = "bWantCastVoice",
  b1HM_MLh_attack = "b1HM_MLh_attack",
  b1HMCombat = "b1HMCombat",
  /** Sets the actor into an animation driven state, meaning animations like "SprintStart" will actually move him, not moonwalk him. */
  bAnimationDriven = "bAnimationDriven",
  bCastReady = "bCastReady",
  /** Allows the actor to rotate or not. */
  bAllowRotation = "bAllowRotation",
  /** Causes the actor to draw his magic out. */
  bMagicDraw = "bMagicDraw",
  /** Equip magic in the left hand. */
  bMLh_Ready = "bMLh_Ready",
  /** Equip magic in the right hand. */
  bMRh_Ready = "bMRh_Ready",
  /** Returns TRUE if weapons/unarmed/shield (but not magic in either or both hands) are drawn, and actor is walking/sprinting. */
  bInMoveState = "bInMoveState",
  /** Sets whether the actor can sprint. */
  bSprintOK = "bSprintOK",
  /** Plays a random Idle. */
  bIdlePlaying = "bIdlePlaying",
  /** Sets if actor's dialogue is expressive. */
  bIsDialogueExpressive = "bIsDialogueExpressive",
  /** Sets whether the anim object is loaded. */
  bAnimObjectLoaded = "bAnimObjectLoaded",
  bEquipUnequip = "bEquipUnequip",
  bAttached = "bAttached",
  /** Sets whether equipping is allowed. */
  bEquipOK = "bEquipOK",
  bIsH2HSolo = "bIsH2HSolo",
  /** Doesn't really set head tracking. It really allows whether an actor can turn to face you. This causes actors talking over their shoulders. */
  bHeadTracking = "bHeadTracking",
  /** Sets the actor into riding. */
  bIsRiding = "bIsRiding",
  /** Whether the actor is able to be talked to. */
  bTalkable = "bTalkable",
  /** Sets a ritual spell active. */
  bRitualSpellActive = "bRitualSpellActive",
  /** Sets the actor in a jump state. */
  bInJumpState = "bInJumpState",
  bHeadTrackSpine = "bHeadTrackSpine",
  /** Sets the actor to attack left. */
  bLeftHandAttack = "bLeftHandAttack",
  /** Sets whether the actor is in a movement type. */
  bIsInMT = "bIsInMT",
  /** Enables foot-to-ground sync. */
  bHumanoidFootIKEnable = "bHumanoidFootIKEnable",
  /** Disables foot-to-ground sync. */
  bHumanoidFootIKDisable = "bHumanoidFootIKDisable",
  bStaggerPlayerOverride = "bStaggerPlayerOverride",
  /** Sets whether the actor can stagger. */
  bNoStagger = "bNoStagger",
  bIsStaffLeftCasting = "bIsStaffLeftCasting",
  /** Gives the actor the ability to shield charge. */
  bPerkShieldCharge = "bPerkShieldCharge",
  /** Gives the actor the quick shot perk. */
  bPerkQuickShot = "bPerkQuickShot",
  /** Checks to see if this actor is currently attacking. */
  IsAttacking = "IsAttacking",
  /** Checks to see if this actor is currently blocking. */
  IsBlocking = "IsBlocking",
  /** Checks to see if this actor is currently bashing. */
  IsBashing = "IsBashing",
  /** Checks to see if this actor is currently staggering. */
  IsStaggering = "IsStaggering",
  /** Checks to see if this actor is currently recoiling. */
  IsRecoiling = "IsRecoiling",
  /** Checks to see if this actor is currently equipping motion. */
  IsEquipping = "IsEquipping",
  /** Checks to see if this actor is currently unequipping motion. */
  IsUnequipping = "IsUnequipping",
}
