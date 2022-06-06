<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NKcontroladores.ascx.vb" Inherits="controladores_NAcontroladores" %>
<%@ Register src="../vistas/partes/PCONGEN.ascx" tagname="PCONGEN" tagprefix="uc1" %>
<%@ Register src="../vistas/partes/PBARNAV.ascx" tagname="PBARNAV" tagprefix="uc3" %>
<%@ Register src="../vistas/partes/PMENU.ascx" tagname="PMENU" tagprefix="uc4" %>

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

