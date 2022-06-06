

Partial Class vistas_NF_NFMUNID
    Inherits NOMADE.N.Cub
    'Dim v_Cod As String
    'Dim malerta As Label
    'Dim v_pantalla As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load


    End Sub

    'Private Sub carga_empresas(ByVal v_empresa As String)
    '    Try
    '        Dim l As New ListItem
    '        Dim cempresa As New NOMADE.general.Cempresa("bn")
    '        Me.dd_empresa.DataSource = cempresa.dame_empresas(v_empresa)
    '        cempresa = Nothing
    '        Me.dd_empresa.DataTextField = "descripcion"
    '        Me.dd_empresa.DataValueField = "codigo"
    '        Me.dd_empresa.DataBind()
    '        Me.dd_empresa.Items.Insert(0, New ListItem("-- Seleccionar --", ""))
    '        Me.dd_empresa.SelectedValue = Request.Cookies("usernomade")("catalogo")
    '    Catch ex As Exception
    '        malerta.Text = "<div class='error'>ERROR: " & ex.Message & "</div>"
    '        malerta.Text = "ERROR: " & ex.Message
    '        Dim c As New NOMADE.seguridad.cControlErrores("Bn")
    '        Dim mensaje As String = ex.ToString().Replace("'", "''")
    '        Dim desmensaje As String = ex.Message.Replace("'", "''")
    '        c.CREAR_ERRORES(v_pantalla, 0, desmensaje, mensaje, Request.Cookies("usernomade")("maquina"), Request.Cookies("usernomade")("id"))
    '    End Try
    'End Sub

    'Private Sub carga_unidad(ByVal v_codigo As String)
    '    Try
    '        Dim sender As New Object
    '        Dim e As New System.EventArgs
    '        Dim c As New NOMADE.Flotas.Cunidad("Bn")
    '        Dim dt As DataTable
    '        dt = c.BUSCAR_UNIDAD(v_codigo, "", "", "")
    '        If Not (dt Is Nothing) Then
    '            For Each MiDataRow As DataRow In dt.Rows
    '                Me.txt_codigo.Text = v_Cod
    '                Me.txt_fecha_inicio.Text = NOMADE.nomade.cutilidades.fechaMostrar(MiDataRow("fecha_inicio").ToString)
    '                Me.txt_fecha_termino.Text = NOMADE.nomade.cutilidades.fechaMostrar(MiDataRow("fecha_termino").ToString)
    '                Me.chb_mtc.Checked = IIf(MiDataRow("mtc").ToString = "S", True, False)
    '                Me.txt_nro_tarjeta.Text = MiDataRow("nro_tarjeta").ToString
    '                Me.txt_placa.Text = MiDataRow("placa").ToString
    '                Me.txt_fabricacion.Text = MiDataRow("anio_fabricacion").ToString
    '                Me.dd_marca.SelectedValue = MiDataRow("codigo_marca").ToString
    '                Me.dd_modelo.SelectedValue = MiDataRow("codigo_modelo").ToString
    '                Me.txt_color.Text = MiDataRow("color").ToString
    '                Me.txt_nro_asientos.Text = MiDataRow("nro_asientos").ToString
    '                Me.txt_peso_seco.Text = MiDataRow("peso_seco").ToString
    '                Me.txt_peso_bruto.Text = MiDataRow("peso_bruto").ToString
    '                Me.txt_nro_motor.Text = MiDataRow("nro_motor").ToString
    '                Me.txt_nro_chasis.Text = MiDataRow("nro_chasis").ToString
    '                Me.dd_gps.SelectedValue = MiDataRow("gps").ToString
    '                Me.txt_fecha_gps.Text = MiDataRow("fecha_gps").ToString
    '                Me.dd_tipo_unidad.SelectedValue = MiDataRow("tipo_unidad").ToString
    '                Me.hdf_propietario.Value = MiDataRow("codigo_propietario").ToString
    '                Me.txt_propietario.Text = MiDataRow("nombre_propietario").ToString

    '                'Me.hdf_conductor.Value = MiDataRow("codigo_conductor").ToString
    '                'Me.txt_conductor.Text = MiDataRow("nombre_conductor").ToString

    '                Me.txt_compa_soat.Text = MiDataRow("compa_soat").ToString
    '                Me.txt_poliza_soat.Text = MiDataRow("poliza_soat").ToString

    '                Me.txt_plataforma.Text = MiDataRow("plataforma").ToString
    '                Me.dd_filas.SelectedValue = MiDataRow("filas").ToString
    '                Me.txt_ancho.Text = MiDataRow("ancho").ToString
    '                Me.txt_alto.Text = MiDataRow("alto").ToString
    '                Me.txt_largo.Text = MiDataRow("largo").ToString

    '                Me.txt_fecha_soat.Text = NOMADE.nomade.cutilidades.fechaMostrar(MiDataRow("fecha_soat").ToString)
    '                Me.chk_estado.Checked = IIf(MiDataRow("Estado").ToString = "ACTIVO", True, False)
    '            Next
    '            chk_estado_CheckedChanged(sender, e)
    '            btn_registrar.Text = "Actualizar"
    '            btn_ver_choferes.Visible = True
    '        End If
    '    Catch ex As Exception
    '        malerta.Text = "ERROR: " & ex.Message
    '        Dim c As New NOMADE.seguridad.cControlErrores("Bn")
    '        Dim mensaje As String = ex.ToString().Replace("'", "''")
    '        Dim desmensaje As String = ex.Message.Replace("'", "''")
    '        c.CREAR_ERRORES(v_pantalla, 0, desmensaje, mensaje, Dns.GetHostEntry(Request.UserHostAddress).HostName, Request.Cookies("usernomade")("id"))
    '    End Try
    'End Sub

    'Private Sub carga_marca(ByVal v_cod As String, ByVal v_des As String, ByVal v_est As String)
    '    Try
    '        Dim c As New NOMADE.Finanzas.Almacen.Cmarca("Bn")
    '        Dim dt As DataTable
    '        dt = c.BUSCAR_MARCA(v_cod, v_des, "", v_est, "V")
    '        c = Nothing
    '        Me.dd_marca.Items.Clear()
    '        Me.dd_marca.DataSource = dt
    '        Me.dd_marca.DataTextField = "DESCRIPCION"
    '        Me.dd_marca.DataValueField = "CODIGO"
    '        Me.dd_marca.DataBind()
    '        Me.dd_marca.Items.Insert(0, New ListItem("-- Seleccionar --", ""))
    '    Catch ex As Exception
    '        malerta.Text = "ERROR: " & ex.Message
    '        Dim c As New NOMADE.seguridad.cControlErrores("Bn")
    '        Dim mensaje As String = ex.ToString().Replace("'", "''")
    '        Dim desmensaje As String = ex.Message.Replace("'", "''")
    '        c.CREAR_ERRORES(v_pantalla, 0, desmensaje, mensaje, Dns.GetHostEntry(Request.UserHostAddress).HostName, Request.Cookies("usernomade")("id"))
    '    End Try
    'End Sub

    'Private Sub carga_modelo(ByVal v_cod As String, ByVal v_des As String, ByVal v_est As String)
    '    Try
    '        Dim dt As DataTable
    '        Dim c As New NOMADE.Finanzas.Almacen.CModeloBus("Bn")
    '        dt = c.LISTAR_MODELOS(v_cod, v_des, "A")
    '        c = Nothing
    '        Me.dd_modelo.Items.Clear()
    '        Me.dd_modelo.DataSource = dt
    '        Me.dd_modelo.DataTextField = "DESCRIPCION"
    '        Me.dd_modelo.DataValueField = "CODIGO"
    '        Me.dd_modelo.DataBind()
    '        Me.dd_modelo.Items.Insert(0, New ListItem("-- Seleccionar --", ""))
    '    Catch ex As Exception
    '        malerta.Text = "ERROR: " & ex.Message
    '        Dim c As New NOMADE.seguridad.cControlErrores("Bn")
    '        Dim mensaje As String = ex.ToString().Replace("'", "''")
    '        Dim desmensaje As String = ex.Message.Replace("'", "''")
    '        c.CREAR_ERRORES(v_pantalla, 0, desmensaje, mensaje, Dns.GetHostEntry(Request.UserHostAddress).HostName, Request.Cookies("usernomade")("id"))
    '    End Try
    'End Sub

    'Protected Sub chk_estado_CheckedChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles chk_estado.CheckedChanged
    '    If Me.chk_estado.Checked Then
    '        Me.txt_fecha_termino.ReadOnly = True
    '        Me.txt_fecha_termino.CssClass = "f_inputl"
    '    Else
    '        Me.txt_fecha_termino.ReadOnly = False
    '        Me.txt_fecha_termino.CssClass = ""
    '    End If
    'End Sub

    'Protected Sub dd_gps_SelectedIndexChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles dd_gps.SelectedIndexChanged
    '    If dd_gps.SelectedValue = "N" Then
    '        Me.txt_fecha_gps.ReadOnly = True
    '        Me.txt_fecha_gps.CssClass = "f_inputl"
    '    Else
    '        Me.txt_fecha_gps.ReadOnly = False
    '        Me.txt_fecha_gps.CssClass = ""
    '    End If
    'End Sub

    'Protected Sub btn_registrar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btn_registrar.Click
    '    Try
    '        Dim f1, f2, f3, f4 As String
    '        Dim msg As String

    '        If dd_empresa.DataSource Is Nothing Then
    '            Me.malerta.Text = "Error: Sin empresas no sepuede registrar"
    '            Exit Sub
    '        End If

    '        If dd_empresa.SelectedIndex = 0 Then
    '            Me.malerta.Text = "Error: Debe seleccionar una empresa"
    '            Exit Sub
    '        End If

    '        If (IsDate(Me.txt_fecha_inicio.Text)) Then
    '            f1 = Utilities.fechaLocal(Me.txt_fecha_inicio.Text)
    '        Else
    '            Me.malerta.Text = "Error: Fecha de Inicio incorrecta"
    '            Exit Sub
    '        End If
    '        If Me.txt_fecha_termino.Text = String.Empty Then
    '            f2 = Nothing
    '        Else
    '            If (IsDate(Me.txt_fecha_termino.Text)) Then
    '                f2 = Utilities.fechaLocal(Me.txt_fecha_termino.Text)
    '            Else
    '                Me.malerta.Text = "Error: Fecha de Termino incorrecta"
    '                Exit Sub
    '            End If
    '        End If
    '        If (Me.txt_placa.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese el Nro de Placa de la Unidad"
    '            Exit Sub
    '        End If
    '        If (Me.txt_fabricacion.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese el Año de Fabricacion de la Unidad"
    '            Exit Sub
    '        Else
    '            If Not IsNumeric(Me.txt_fabricacion.Text) Then
    '                malerta.Text = "Error: Ingrese Solo Numeros en el Año de Fabricacion de la Unidad"
    '                Exit Sub
    '            End If
    '        End If
    '        If (Me.dd_marca.SelectedIndex = 0) Then
    '            malerta.Text = "Error: Seleccione la Marca de la Unidad"
    '            Exit Sub
    '        End If
    '        If (Me.dd_modelo.SelectedIndex = 0) Then
    '            malerta.Text = "Error: Seleccione el Modelo de la Unidad"
    '            Exit Sub
    '        End If
    '        If (Me.txt_color.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese el Color de la Unidad"
    '            Exit Sub
    '        End If
    '        If (Me.txt_nro_asientos.Text <> String.Empty) Then
    '            If Not IsNumeric(Me.txt_nro_asientos.Text) Then
    '                malerta.Text = "Error: Ingrese Solo Numeros en Nro de Asientos de la Unidad"
    '                Exit Sub
    '            End If
    '        End If
    '        If Me.txt_fecha_gps.Text = String.Empty Then
    '            f3 = Nothing
    '        Else
    '            If (IsDate(Me.txt_fecha_gps.Text)) Then
    '                f3 = Utilities.fechaLocal(Me.txt_fecha_gps.Text)
    '            Else
    '                Me.malerta.Text = "Error: Fecha de GPS incorrecta"
    '                Exit Sub
    '            End If
    '        End If

    '        If Me.hdf_propietario.Value = String.Empty Then
    '            malerta.Text = "Error: Seleccione el Propietario de la Unidad"
    '            Exit Sub
    '        End If
    '        If Me.txt_fecha_soat.Text = String.Empty Then
    '            f4 = Nothing
    '        Else
    '            If (IsDate(Me.txt_fecha_soat.Text)) Then
    '                f4 = Utilities.fechaLocal(Me.txt_fecha_soat.Text)
    '            Else
    '                Me.malerta.Text = "Error: Fecha de SOAT incorrecta"
    '                Exit Sub
    '            End If
    '        End If

    '        Dim c As New NOMADE.Flotas.Cunidad("bn")

    '        If Me.txt_codigo.Text <> String.Empty Then
    '            msg = c.ACTUALIZAR_UNIDAD(Me.txt_codigo.Text, f1, f2, IIf(Me.chb_mtc.Checked, "S", "N"), Me.txt_nro_tarjeta.Text.ToUpper, Me.txt_placa.Text.ToUpper, _
    '                                      Me.txt_fabricacion.Text, Me.dd_marca.SelectedValue, Me.dd_modelo.SelectedValue, Me.txt_color.Text.ToUpper, Me.txt_nro_asientos.Text, _
    '                                      Me.txt_peso_seco.Text, Me.txt_peso_bruto.Text, Me.txt_nro_motor.Text.ToUpper, "", Me.txt_nro_chasis.Text, _
    '                                      Me.dd_gps.SelectedValue, f3, hdf_propietario.Value, Me.txt_compa_soat.Text.ToUpper, _
    '                                      Me.txt_poliza_soat.Text.ToUpper, f4, IIf(Me.chk_estado.Checked, "A", "I"), Request.Cookies("usernomade")("id"), _
    '                                      Me.txt_plataforma.Text, Me.dd_filas.SelectedValue, Me.txt_largo.Text, Me.txt_ancho.Text, Me.txt_alto.Text, _
    '                                      Me.dd_tipo_unidad.SelectedValue, Request.Cookies("usernomade")("sucursal"), dd_empresa.SelectedValue, Nothing)
    '            malerta.Text = "Transacción terminada: registros aplicados y guardados."
    '        Else
    '            msg = c.CREAR_UNIDAD(f1, f2, IIf(Me.chb_mtc.Checked, "S", "N"), Me.txt_nro_tarjeta.Text.ToUpper, Me.txt_placa.Text.ToUpper, Me.txt_fabricacion.Text, _
    '                                 Me.dd_marca.SelectedValue, Me.dd_modelo.SelectedValue, Me.txt_color.Text.ToUpper, Me.txt_nro_asientos.Text, Me.txt_peso_seco.Text, _
    '                                 Me.txt_peso_bruto.Text, Me.txt_nro_motor.Text.ToUpper, "", Me.txt_nro_chasis.Text, Me.dd_gps.SelectedValue, _
    '                                 f3, hdf_propietario.Value, Me.txt_compa_soat.Text.ToUpper, Me.txt_poliza_soat.Text.ToUpper, f4, _
    '                                 IIf(Me.chk_estado.Checked, "A", "I"), Request.Cookies("usernomade")("id"), _
    '                                 Me.txt_plataforma.Text, Me.dd_filas.SelectedValue, Me.txt_largo.Text, Me.txt_ancho.Text, Me.txt_alto.Text, _
    '                                 Me.dd_tipo_unidad.SelectedValue, Request.Cookies("usernomade")("sucursal"), dd_empresa.SelectedValue, Nothing)

    '            'If dd_tipo_unidad.SelectedValue = "T" Then
    '            '    Dim a As New Nomade.Finanzas.Almacen.Calamcen("Bn")
    '            '    Dim res As String
    '            '    res = a.CREAR_ALMACEN(Me.txt_placa.Text, Request.Cookies("usernomade")("catalogo"), Request.Cookies("usernomade")("sucursal"), Me.txt_placa.Text, Me.dd_marca.SelectedItem.Text & "-" & Me.dd_modelo.SelectedItem.Text, _
    '            '                    Nothing, "0001", Nothing, Nothing, Nothing, Me.txt_conductor.Text, "A", Request.Cookies("usernomade")("id"))
    '            '    If res = "OK" Then
    '            '        malerta.Text = "Transacción terminada: registros aplicados y guardados (1)."
    '            '    End If
    '            'End If

    '            malerta.Text = "Transacción terminada: registros aplicados y guardados."
    '            Response.Redirect("?c=flo&v=ftmflot&p=" & msg)
    '        End If
    '        c = Nothing
    '        'Me.btn_ver_choferes.Enabled = True
    '    Catch ex As Exception
    '        malerta.Text = "ERROR: " & ex.ToString
    '        Dim c As New NOMADE.seguridad.cControlErrores("Bn")
    '        Dim mensaje As String = ex.ToString().Replace("'", "''")
    '        Dim desmensaje As String = ex.Message.Replace("'", "''")
    '        c.CREAR_ERRORES(v_pantalla, 0, desmensaje, mensaje, Dns.GetHostEntry(Request.UserHostAddress).HostName, Request.Cookies("usernomade")("id"))
    '    End Try
    'End Sub

    'Protected Sub dd_modelo_SelectedIndexChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles dd_modelo.SelectedIndexChanged
    '    If Me.dd_modelo.SelectedIndex = 0 Then
    '        Me.txt_nro_asientos.Text = ""
    '        Me.txt_peso_seco.Text = ""
    '        Me.txt_peso_bruto.Text = ""
    '    Else
    '        Dim c As New NOMADE.Finanzas.Almacen.CModeloBus("Bn")
    '        Dim dt As DataTable = c.LISTAR_MODELOS(Me.dd_modelo.SelectedValue, "", "")
    '        If Not (dt Is Nothing) Then
    '            Me.txt_nro_asientos.Text = dt.Rows(0)("ASIENTOS").ToString
    '            Me.txt_peso_seco.Text = dt.Rows(0)("PESO_SECO").ToString
    '            Me.txt_peso_bruto.Text = dt.Rows(0)("PESO_BRUTO").ToString
    '        End If
    '    End If
    'End Sub

End Class
