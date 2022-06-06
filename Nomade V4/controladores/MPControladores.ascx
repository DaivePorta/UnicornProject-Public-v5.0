﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MPControladores.ascx.vb" Inherits="controladores_MPControladores" %>
<%@ Register Src="../vistas/partes/PCONGEN.ascx" TagName="PCONGEN" TagPrefix="uc1" %>
<%@ Register Src="../vistas/partes/PBARNAV.ascx" TagName="PBARNAV" TagPrefix="uc3" %>
<%@ Register Src="../vistas/partes/PMENU.ascx" TagName="PMENU" TagPrefix="uc4" %>

<div id="cmenu" runat="server">
    <uc3:PBARNAV ID="PBARNAV1" runat="server"></uc3:PBARNAV>
    <uc4:PMENU ID="PMENU1" runat="server"></uc4:PMENU>
    <div class="e_der0">
        <div class="rightnomade">
            <asp:Literal ID="lbl_titulo" runat="server"></asp:Literal>
            <uc1:PCONGEN ID="PCONGEN1" runat="server"></uc1:PCONGEN>
        </div>
    </div>
</div>
<div id="barra" runat="server">
    <uc3:PBARNAV ID="PBARNAV2" runat="server"></uc3:PBARNAV>
    <div id="cont3" runat="server" class="rightnomade">
        <uc1:PCONGEN ID="PCONGEN3" runat="server"></uc1:PCONGEN>
    </div>
</div>
<div id="todo" runat="server">
    <div class="rightnomade">
        <uc1:PCONGEN ID="PCONGEN2" runat="server"></uc1:PCONGEN>
    </div>
</div>
